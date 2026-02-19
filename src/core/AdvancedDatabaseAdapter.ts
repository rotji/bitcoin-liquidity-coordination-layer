export class AdvancedDatabaseAdapter {
  private store: Map<string, any> = new Map();

  private validateId(id: string) {
    if (
      typeof id !== "string" ||
      !id ||
      id === "__proto__" ||
      id === "constructor" ||
      /[;\s]/.test(id)
    ) {
      throw new Error("Invalid ID");
    }
  }

  private validateValue(value: any) {
    if (value === undefined || value === null) {
      throw new Error("Invalid value");
    }
  }

  async create(id: string, value: any) {
    try {
      this.validateId(id);
      this.validateValue(value);
      this.store.set(id, value);
      console.log(`[AdvancedDatabaseAdapter] create: ${id}`);
      return value;
    } catch (err) {
      console.log(`[AdvancedDatabaseAdapter] error in create: ${err.message}`);
      throw err;
    }
  }

  async read(id: string) {
    return this.store.get(id);
  }

  async update(id: string, value: any) {
    try {
      this.validateId(id);
      this.validateValue(value);
      if (!this.store.has(id)) throw new Error("Not found");
      this.store.set(id, value);
      console.log(`[AdvancedDatabaseAdapter] update: ${id}`);
      return value;
    } catch (err) {
      console.log(`[AdvancedDatabaseAdapter] error in update: ${err.message}`);
      throw err;
    }
  }

  async delete(id: string) {
    try {
      this.validateId(id);
      if (!this.store.has(id)) throw new Error("Not found");
      this.store.delete(id);
      console.log(`[AdvancedDatabaseAdapter] delete: ${id}`);
      return true;
    } catch (err) {
      console.log(`[AdvancedDatabaseAdapter] error in delete: ${err.message}`);
      throw err;
    }
  }

  async transaction(
    ops: Array<{
      type: "create" | "update" | "delete";
      id: string;
      value?: any;
    }>,
  ) {
    const backup = new Map(this.store);
    const results: any[] = [];
    try {
      for (const op of ops) {
        if (op.type === "create")
          results.push(await this.create(op.id, op.value));
        else if (op.type === "update")
          results.push(await this.update(op.id, op.value));
        else if (op.type === "delete") results.push(await this.delete(op.id));
        else throw new Error("Invalid operation type");
      }
      console.log(`[AdvancedDatabaseAdapter] transaction: ${ops.length} ops`);
      return { success: true, results };
    } catch (err) {
      this.store = backup;
      console.log(
        `[AdvancedDatabaseAdapter] error in transaction: ${err.message}`,
      );
      return { success: false, error: err };
    }
  }
}
