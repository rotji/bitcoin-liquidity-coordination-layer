(define-data-var intent-count uint u0)

(define-map intents
  { intent-id: uint }
  {
    user: principal,
    from-asset-id: uint,
    to-asset-id: uint,
    amount: uint,
    max-slippage: uint,
    expiry-height: uint,
    status: uint
  }
)

;; Write function: publish-intent
(define-public (publish-intent (from-asset-id uint) (to-asset-id uint) (amount uint) (max-slippage uint) (expiry-height uint))
  (let ((intent-id (var-get intent-count)))
    (begin
      (map-set intents { intent-id: intent-id }
        {
          user: tx-sender,
          from-asset-id: from-asset-id,
          to-asset-id: to-asset-id,
          amount: amount,
          max-slippage: max-slippage,
          expiry-height: expiry-height,
          status: u0 ;; open
        }
      )
      (var-set intent-count (+ intent-id u1))
      (ok intent-id)
    )
  )
)

;; Write function: mark-intent-filled
(define-public (mark-intent-filled (intent-id uint))
  (let ((intent (map-get? intents { intent-id: intent-id })))
    (if (is-some intent)
      (begin
        (map-set intents { intent-id: intent-id }
          (merge (unwrap! intent (err u404)) { status: u1 }) ;; filled
        )
        (ok true)
      )
      (err u404)
    )
  )
)

;; Write function: expire-intent
(define-public (expire-intent (intent-id uint))
  (let ((intent (map-get? intents { intent-id: intent-id })))
    (if (is-some intent)
      (begin
        (map-set intents { intent-id: intent-id }
          (merge (unwrap! intent (err u404)) { status: u2 }) ;; expired
        )
        (ok true)
      )
      (err u404)
    )
  )
)

;; Read function: get-intent
(define-read-only (get-intent (intent-id uint))
  (map-get? intents { intent-id: intent-id })
)

;; Read function: list-open-intents
(define-read-only (list-open-intents)
  ;; This is a stub; in practice, you would iterate and filter intents by status == u0 (open)
  (ok none)
)
