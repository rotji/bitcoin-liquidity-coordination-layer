(define-map assets
  ((id uint))
  {
    asset-type: (string-ascii 32),
    decimals: uint,
    risk-classification: (string-ascii 32),
    enabled: bool
  }
)

(define-data-var next-asset-id uint 1)

(define-public (register-asset (asset-type (string-ascii 32)) (decimals uint) (risk-classification (string-ascii 32)))
  (let
    ((id (var-get next-asset-id)))
    (begin
      (map-set assets
        ((id id))
        {
          asset-type: asset-type,
          decimals: decimals,
          risk-classification: risk-classification,
          enabled: true
        }
      )
      (var-set next-asset-id (+ id u1))
      (ok id)
    )
  )
)

(define-public (set-asset-enabled (id uint) (enabled bool))
  (begin
    (map-set assets ((id id))
      (merge (default-to {} (map-get? assets ((id id))))
        {
          enabled: enabled
        }
      )
    )
    (ok true)
  )
)

(define-read-only (get-asset (id uint))
  (map-get? assets ((id id)))
)

(define-read-only (get-next-asset-id)
  (var-get next-asset-id)
)
