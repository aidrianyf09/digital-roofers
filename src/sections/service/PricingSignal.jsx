import { motion } from 'motion/react';
import { IconCreditCard } from '@tabler/icons-react';
import { ease, dur, inViewDefaults } from '../../motion/motion-config.js';

/**
 * No numbers on the public site. We signal structure ("three tiers, no
 * long-term lock-in") and push to the call. For Google Ads + Meta Ads, we
 * also show the ad-spend trust callout.
 */
export default function PricingSignal({ service }) {
  return (
    <section className="dr-svc-price">
      <div className="dr-container">
        <motion.div
          className="dr-svc-price__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewDefaults}
          transition={{ duration: dur.slow, ease: ease.outExpo }}
        >
          <p className="dr-svc-price__line">
            Three engagement tiers built around how aggressively you want to grow.
            No long-term lock-in. On the call we'll point you at the tier that fits your pipeline goals.
          </p>

          {service.adSpendTrust && (
            <div className="dr-svc-price__trust">
              <IconCreditCard size={22} stroke={1.75} style={{ color: service.accent }} />
              <div className="dr-svc-price__trust-copy">
                <strong>Your ad spend goes directly to Google. Never through us.</strong>
                <span>
                  You see exactly what you pay Google, what you pay us, and what came back.
                  No markup. No shell games.
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
