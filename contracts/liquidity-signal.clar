(define-data-var signal-count uint u0)

(define-map liquidity-signals
  {
    protocol-id: uint,
    base-asset-id: uint,
    quote-asset-id: uint,
    block-height: uint
  }
  {
    liquidity-hash: (buff 32),
    depth-range: uint,
    spread-range: uint,
    submitted-by: principal
  }
)

;; Write function: commit-liquidity-signal
(define-public (commit-liquidity-signal (protocol-id uint) (base-asset-id uint) (quote-asset-id uint) (liquidity-hash (buff 32)) (depth-range uint) (spread-range uint))
  (let ((block-height (as-max-len! (block-height) u128)))
    (begin
      (map-set liquidity-signals
        {
          protocol-id: protocol-id,
          base-asset-id: base-asset-id,
          quote-asset-id: quote-asset-id,
          block-height: block-height
        }
        {
          liquidity-hash: liquidity-hash,
          depth-range: depth-range,
          spread-range: spread-range,
          submitted-by: tx-sender
        }
      )
      (var-set signal-count (+ (var-get signal-count) u1))
      (ok true)
    )
  )
)

;; Read function: get-latest-signal
(define-read-only (get-latest-signal (protocol-id uint) (base-asset-id uint) (quote-asset-id uint))
  ;; This is a stub; in practice, you would iterate block heights in reverse to find the latest
  (ok none)
)

;; Read function: get-signal-by-height
(define-read-only (get-signal-by-height (protocol-id uint) (base-asset-id uint) (quote-asset-id uint) (block-height uint))
  (map-get? liquidity-signals {
    protocol-id: protocol-id,
    base-asset-id: base-asset-id,
    quote-asset-id: quote-asset-id,
    block-height: block-height
  })
)
