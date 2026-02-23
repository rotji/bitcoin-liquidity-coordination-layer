(define-constant min-score-threshold int -10)
(define-constant reward-eligibility-score int 10)

(define-map actor-reputation
  { actor: principal }
  {
    score: int,
    successful-claims: uint,
    failed-claims: uint,
    last-updated: uint
  }
)

;; Write function: increase-reputation
(define-public (increase-reputation (actor principal) (delta int))
  (let ((rep (map-get? actor-reputation { actor: actor })))
    (let ((new-score (+ (get score (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)) delta)))
      (map-set actor-reputation { actor: actor }
        {
          score: new-score,
          successful-claims: (get successful-claims (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)),
          failed-claims: (get failed-claims (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)),
          last-updated: block-height
        }
      )
      (ok new-score)
    )
  )
)

;; Write function: decrease-reputation
(define-public (decrease-reputation (actor principal) (delta int))
  (let ((rep (map-get? actor-reputation { actor: actor })))
    (let ((new-score (- (get score (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)) delta)))
      (map-set actor-reputation { actor: actor }
        {
          score: new-score,
          successful-claims: (get successful-claims (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)),
          failed-claims: (get failed-claims (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)),
          last-updated: block-height
        }
      )
      (ok new-score)
    )
  )
)

;; Read function: get-reputation
(define-read-only (get-reputation (actor principal))
  (map-get? actor-reputation { actor: actor })
)

;; Read function: is-eligible-for-rewards
(define-read-only (is-eligible-for-rewards (actor principal))
  (let ((rep (map-get? actor-reputation { actor: actor })))
    (ok (>= (get score (default-to { score: 0, successful-claims: u0, failed-claims: u0, last-updated: block-height } rep)) reward-eligibility-score))
  )
)
