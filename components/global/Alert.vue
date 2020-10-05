<template>
  <div class="alert border-l-4 p-4 mb-4 mt-4" :class="`alert-${type}`">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <component :is="icon" class="alert-icon mt-px w-6 h-6" />
      </div>
      <div class="flex-grow ml-2 overflow-auto alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  },
  computed: {
    icon() {
      return {
        info: 'IconInformationCircle',
        success: 'IconCheckCircle',
        warning: 'IconExclamationCircle',
        danger: 'IconXCircle'
      }[this.type]
    }
  }
}
</script>

<style>
/* Info */

.alert-info {
  @apply bg-blue-100 border-blue-400;
}
.alert-info code {
  @apply bg-blue-200 shadow-none border-0 text-current;
}
.alert-info .alert-icon {
  @apply text-blue-400;
}
.alert-info .alert-content {
  @apply text-blue-700;
}

/* Success */

.alert-success {
  @apply bg-green-100 border-green-400;
}
.alert-success code {
  @apply bg-green-200 shadow-none border-0 text-current;
}
.alert-success .alert-icon {
  @apply text-green-400;
}
.alert-success .alert-content {
  @apply text-green-700;
}

/* Warning */

.alert-warning {
  @apply bg-orange-100 border-orange-400;
}
.alert-warning code {
  @apply bg-orange-200 shadow-none border-0 text-current;
}
.alert-warning .alert-icon {
  @apply text-orange-400;
}
.alert-warning .alert-content {
  @apply text-orange-700;
}

/* Danger */

.alert-danger {
  @apply bg-red-100 border-red-400;
}
.alert-danger code {
  @apply bg-red-200 shadow-none border-0 text-current;
}
.alert-danger .alert-icon {
  @apply text-red-400;
}
.alert-danger .alert-content {
  @apply text-red-700;
}

.alert p {
  @apply m-0 !important;
}

.alert a {
  @apply text-gray-700 !important;
}

.alert strong {
  @apply text-current;
}

.alert-content pre code {
  background-color: inherit !important;
}
</style>
