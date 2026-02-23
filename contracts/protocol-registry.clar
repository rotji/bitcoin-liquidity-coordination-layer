
(define-map protocols
  ((id uint))
  {
    name: (string-ascii 64),
    type: (string-ascii 32),
    status: (string-ascii 16),
    metadata-hash: (buff 32),
    governance-approved: bool
  }
)

(define-data-var next-protocol-id uint 1)


(define-public (register-protocol (name (string-ascii 64)) (type (string-ascii 32)) (metadata-hash (buff 32)))
  (let
    ((id (var-get next-protocol-id)))
    (begin
      (map-set protocols
        ((id id))
        {
          name: name,
          type: type,
          status: "active",
          metadata-hash: metadata-hash,
          governance-approved: false
        }
      )
      (var-set next-protocol-id (+ id u1))
      (ok id)
    )
  )
)


(define-public (set-protocol-status (id uint) (status (string-ascii 16)))
  (begin
    (map-set protocols ((id id))
      (merge (default-to {} (map-get? protocols ((id id))))
        {
          status: status
        }
      )
    )
    (ok true)
  )
)


(define-public (approve-protocol (id uint))
  (begin
    (map-set protocols ((id id))
      (merge (default-to {} (map-get? protocols ((id id))))
        {
          governance-approved: true
        }
      )
    )
    (ok true)
  )
)

(define-read-only (get-protocol (id uint))
  (map-get? protocols ((id id)))
)

(define-read-only (get-next-protocol-id)
  (var-get next-protocol-id)
)
