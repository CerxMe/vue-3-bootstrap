<template lang="pug">
.home-page
  header.header
    NavBar

  main.main-content
    section.hero-section
      .hero-content
        .hero-badge
          span.badge-icon ⚔️
          span.badge-text ULTIMATE WARRIOR FORGE

        h1.hero-title
          span.gradient-text Create. Upgrade. Conquer.

        p.hero-subtitle
          | Build the most powerful warrior in the universe through endless upgrades.
          br
          | Unlock legendary pages with rare keys. Your journey to glory begins now.

        .hero-actions
          button.btn.btn-primary.btn-large(@click="navigateToGame")
            span.btn-icon 🎮
            span Start Your Journey

          button.btn.btn-secondary.btn-large(@click="scrollToFeatures")
            span Explore Features

      .hero-visual
        .warrior-card
          .warrior-glow
          .warrior-icon 🛡️
          .stat-bars
            .stat-bar(v-for="i in 4" :key="i" :style="{ animationDelay: `${i * 0.1}s` }")

    section.features-section(ref="featuresSection")
      .container
        h2.section-title
          span.title-icon ✨
          span Unleash Your Power

        .features-grid
          .feature-card(v-for="feature in features" :key="feature.title")
            .feature-icon {{ feature.icon }}
            h3.feature-title {{ feature.title }}
            p.feature-description {{ feature.description }}
            .feature-badge {{ feature.badge }}

    section.cta-section
      .cta-container
        .cta-content
          h2.cta-title Ready to Forge Your Legend?
          p.cta-description
            | Every great warrior starts somewhere. Begin your journey today and unlock
            | powerful pages, collect rare keys, and become unstoppable.

          button.btn.btn-cta(@click="navigateToGame")
            span.btn-icon ⚡
            span Enter the Arena

        .cta-stats
          .stat-item(v-for="stat in stats" :key="stat.label")
            .stat-value {{ stat.value }}
            .stat-label {{ stat.label }}

  footer.footer
    .footer-content
      p.footer-text
        | Built with ⚔️ by warriors, for warriors
      .footer-links
        a.footer-link(href="#") About
        a.footer-link(href="#") Support
        a.footer-link(href="#") Community
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// @ts-ignore - Used in Pug template
import NavBar from "../components/NavBar.vue";

const router = useRouter();
const featuresSection = ref<HTMLElement | null>(null);

// @ts-ignore - Used in Pug template
const features = [
  {
    icon: '⚔️',
    title: 'Endless Upgrades',
    description: 'Enhance your warrior with unlimited stat improvements. Attack, defense, health, and speed - the sky is the limit.',
    badge: 'Core System'
  },
  {
    icon: '🔑',
    title: 'Key Collection',
    description: 'Earn rare keys by reaching power milestones. Bronze, silver, gold, platinum, and cosmic keys await.',
    badge: 'Progression'
  },
  {
    icon: '🚪',
    title: 'Unlock Pages',
    description: 'Use your hard-earned keys to unlock exclusive pages with special features, calculators, and secrets.',
    badge: 'Exploration'
  },
  {
    icon: '📊',
    title: 'Track Progress',
    description: 'Visualize your warrior growth with detailed charts and statistics. See your journey to greatness.',
    badge: 'Analytics'
  },
  {
    icon: '🏆',
    title: 'Achievements',
    description: 'Complete challenges and earn achievements. Show off your warrior mastery and collect rewards.',
    badge: 'Goals'
  },
  {
    icon: '♾️',
    title: 'Prestige System',
    description: 'Reset your progress for permanent bonuses. Each prestige makes you stronger than before.',
    badge: 'Endgame'
  }
];

// @ts-ignore - Used in Pug template
const stats = [
  { value: '∞', label: 'Max Power' },
  { value: '5', label: 'Key Types' },
  { value: '10+', label: 'Pages' },
  { value: '50+', label: 'Achievements' }
];

// @ts-ignore - Used in Pug template
const navigateToGame = () => {
  router.push('/test');
};

// @ts-ignore - Used in Pug template
const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<style lang="stylus" scoped>
@import "../assets/vars.styl"

.home-page
  min-height 100vh
  display flex
  flex-direction column

.header
  position relative
  z-index 100

.main-content
  flex 1

// Hero Section
.hero-section
  min-height calc(100vh - 60px)
  display flex
  align-items center
  justify-content center
  padding 4rem 2rem
  position relative
  overflow hidden
  background linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(255, 64, 129, 0.05) 100%)

  &::before
    content ''
    position absolute
    top -50%
    right -20%
    width 800px
    height 800px
    background radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)
    animation float 20s infinite ease-in-out

  &::after
    content ''
    position absolute
    bottom -30%
    left -10%
    width 600px
    height 600px
    background radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%)
    animation float 25s infinite ease-in-out reverse

.hero-content
  max-width 600px
  z-index 2
  margin-right 3rem

  @media (max-width: 968px)
    margin-right 0
    text-align center

.hero-badge
  display inline-flex
  align-items center
  gap 0.5rem
  padding 0.5rem 1rem
  background rgba(0, 188, 212, 0.1)
  border 1px solid rgba(0, 188, 212, 0.3)
  border-radius 50px
  margin-bottom 1.5rem
  font-size 0.875rem
  font-weight 600
  letter-spacing 1px
  color primary
  animation slideDown 0.6s ease-out

.badge-icon
  font-size 1rem

.hero-title
  font-size 3.5rem
  font-weight 700
  line-height 1.2
  margin-bottom 1.5rem
  animation slideDown 0.6s ease-out 0.1s backwards

  @media (max-width: 768px)
    font-size 2.5rem

.gradient-text
  background linear-gradient(135deg, primary 0%, secondary 100%)
  -webkit-background-clip text
  -webkit-text-fill-color transparent
  background-clip text

.hero-subtitle
  font-size 1.25rem
  line-height 1.8
  color rgba(220, 237, 255, 0.8)
  margin-bottom 2.5rem
  animation slideDown 0.6s ease-out 0.2s backwards

  @media (max-width: 768px)
    font-size 1.1rem

.hero-actions
  display flex
  gap 1rem
  animation slideDown 0.6s ease-out 0.3s backwards

  @media (max-width: 768px)
    flex-direction column

.btn
  display inline-flex
  align-items center
  gap 0.5rem
  padding 0.75rem 1.5rem
  border-radius 8px
  font-weight 600
  font-size 1rem
  transition all 0.3s ease
  cursor pointer
  border none
  outline none
  position relative
  overflow hidden

  &::before
    content ''
    position absolute
    top 50%
    left 50%
    width 0
    height 0
    border-radius 50%
    background rgba(255, 255, 255, 0.1)
    transform translate(-50%, -50%)
    transition width 0.6s, height 0.6s

  &:hover::before
    width 300px
    height 300px

  &:hover
    transform translateY(-2px)
    box-shadow 0 8px 24px rgba(0, 0, 0, 0.3)

.btn-primary
  background linear-gradient(135deg, primary 0%, #008ba3 100%)
  color white

  &:hover
    box-shadow 0 8px 24px rgba(0, 188, 212, 0.4)

.btn-secondary
  background rgba(255, 255, 255, 0.05)
  border 2px solid rgba(255, 255, 255, 0.1)
  color primaryText

  &:hover
    background rgba(255, 255, 255, 0.1)
    border-color rgba(255, 255, 255, 0.2)

.btn-large
  padding 1rem 2rem
  font-size 1.1rem

.btn-icon
  font-size 1.2rem

.hero-visual
  z-index 2

  @media (max-width: 968px)
    display none

.warrior-card
  width 350px
  height 450px
  background linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%)
  border 2px solid rgba(0, 188, 212, 0.3)
  border-radius 20px
  padding 2rem
  position relative
  display flex
  flex-direction column
  align-items center
  justify-content center
  animation float 6s infinite ease-in-out
  backdrop-filter blur(10px)

.warrior-glow
  position absolute
  inset -2px
  background linear-gradient(135deg, primary, secondary)
  border-radius 20px
  opacity 0.5
  filter blur(20px)
  z-index -1
  animation pulse 3s infinite ease-in-out

.warrior-icon
  font-size 8rem
  margin-bottom 2rem
  filter drop-shadow(0 0 20px rgba(0, 188, 212, 0.5))
  animation bounce 2s infinite ease-in-out

.stat-bars
  width 100%
  display flex
  flex-direction column
  gap 1rem

.stat-bar
  height 12px
  background rgba(0, 188, 212, 0.2)
  border-radius 6px
  position relative
  overflow hidden

  &::after
    content ''
    position absolute
    inset 0
    background linear-gradient(90deg, primary, secondary)
    border-radius 6px
    animation fillBar 2s infinite ease-in-out

// Features Section
.features-section
  padding 6rem 2rem
  background rgba(0, 0, 0, 0.2)

.container
  max-width 1200px
  margin 0 auto

.section-title
  font-size 2.5rem
  font-weight 700
  text-align center
  margin-bottom 4rem
  display flex
  align-items center
  justify-content center
  gap 1rem

  @media (max-width: 768px)
    font-size 2rem

.title-icon
  font-size 2rem

.features-grid
  display grid
  grid-template-columns repeat(auto-fit, minmax(320px, 1fr))
  gap 2rem

  @media (max-width: 768px)
    grid-template-columns 1fr

.feature-card
  background rgba(0, 188, 212, 0.05)
  border 1px solid rgba(0, 188, 212, 0.2)
  border-radius 16px
  padding 2rem
  transition all 0.3s ease
  cursor pointer
  position relative
  overflow hidden

  &::before
    content ''
    position absolute
    inset 0
    background linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%)
    opacity 0
    transition opacity 0.3s ease

  &:hover
    transform translateY(-8px)
    border-color rgba(0, 188, 212, 0.5)
    box-shadow 0 12px 32px rgba(0, 188, 212, 0.2)

    &::before
      opacity 1

    .feature-icon
      transform scale(1.2) rotate(5deg)

.feature-icon
  font-size 3rem
  margin-bottom 1rem
  display block
  transition transform 0.3s ease

.feature-title
  font-size 1.5rem
  font-weight 600
  margin-bottom 1rem
  color primaryText
  position relative
  z-index 1

.feature-description
  font-size 1rem
  line-height 1.6
  color rgba(220, 237, 255, 0.7)
  margin-bottom 1rem
  position relative
  z-index 1

.feature-badge
  display inline-block
  padding 0.25rem 0.75rem
  background rgba(0, 188, 212, 0.2)
  border 1px solid rgba(0, 188, 212, 0.3)
  border-radius 20px
  font-size 0.875rem
  color primary
  position relative
  z-index 1

// CTA Section
.cta-section
  padding 6rem 2rem
  background linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%)

.cta-container
  max-width 1200px
  margin 0 auto
  text-align center

.cta-title
  font-size 3rem
  font-weight 700
  margin-bottom 1.5rem
  background linear-gradient(135deg, primary 0%, secondary 100%)
  -webkit-background-clip text
  -webkit-text-fill-color transparent
  background-clip text

  @media (max-width: 768px)
    font-size 2rem

.cta-description
  font-size 1.25rem
  line-height 1.8
  color rgba(220, 237, 255, 0.8)
  margin-bottom 3rem
  max-width 700px
  margin-left auto
  margin-right auto

.btn-cta
  padding 1.25rem 2.5rem
  font-size 1.25rem
  background linear-gradient(135deg, secondary 0%, #d63369 100%)
  color white

  &:hover
    box-shadow 0 12px 32px rgba(255, 64, 129, 0.4)

.cta-stats
  display flex
  justify-content center
  gap 4rem
  margin-top 4rem
  flex-wrap wrap

.stat-item
  text-align center

.stat-value
  font-size 3rem
  font-weight 700
  background linear-gradient(135deg, primary 0%, secondary 100%)
  -webkit-background-clip text
  -webkit-text-fill-color transparent
  background-clip text
  margin-bottom 0.5rem

.stat-label
  font-size 1rem
  color rgba(220, 237, 255, 0.6)
  text-transform uppercase
  letter-spacing 1px

// Footer
.footer
  padding 2rem
  background rgba(0, 0, 0, 0.3)
  border-top 1px solid rgba(0, 188, 212, 0.2)

.footer-content
  max-width 1200px
  margin 0 auto
  display flex
  justify-content space-between
  align-items center

  @media (max-width: 768px)
    flex-direction column
    gap 1rem

.footer-text
  color rgba(220, 237, 255, 0.6)

.footer-links
  display flex
  gap 2rem

.footer-link
  color rgba(220, 237, 255, 0.6)
  text-decoration none
  transition color 0.3s ease

  &:hover
    color primary

// Animations
@keyframes slideDown
  from
    opacity 0
    transform translateY(-30px)
  to
    opacity 1
    transform translateY(0)

@keyframes float
  0%, 100%
    transform translateY(0)
  50%
    transform translateY(-20px)

@keyframes pulse
  0%, 100%
    opacity 0.3
  50%
    opacity 0.6

@keyframes bounce
  0%, 100%
    transform translateY(0)
  50%
    transform translateY(-15px)

@keyframes fillBar
  0%
    transform translateX(-100%)
  50%
    transform translateX(0)
  100%
    transform translateX(100%)
</style>
