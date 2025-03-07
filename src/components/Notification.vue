<script setup>
  defineEmits({
    closedNotification: "closedNotification"
  })

  defineProps({
    message_notification: {
      type: String,
      required: true
    },
    notification: {
      type: Object,
      required: true,
      default: () => ({ success: false, error: false }),
    }
    })

</script>

<template>
<div class="notification" :class="{ success: notification.success, error: notification.error }">
  <span class="notification__text">{{ message_notification }}</span>
  <img @click="$emit('closedNotification')" class="notification__closed" src="./icons/img.png" alt="Крестик">
</div>
</template>

<style scoped>

.notification {
  display: flex;
  justify-content: flex-start;
  background-color: #fbfbfb;
  width: 220px;
  height: 80px;
  border-radius: 6px;
  border: 1px solid #bf18d1;
  position: fixed;
  right: 30px;
  bottom: 30px;
}

.notification__text {
  text-align: center;
  font-size: 18px;
  padding: 5px;
  margin-top: 6px;
}

.notification__closed {
  width: 12px;
  height: 12px;
  margin: 5px 5px;
}

.success {
  background-image: url("./icons/ph-not.gif");
  font-size: 17px;
}

.error {
  background-image: url("./icons/picmix.com_1549570.gif");
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}
</style>
