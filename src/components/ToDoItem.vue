<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  tooltipVisible: {
    type: Boolean,
    required: true,
  },
  tooltipMsg: {
    type: String,
    required: true,
  },
})
defineEmits( {
    deleteItem: 'deleteItem',
    activeItem: 'activeItem',
    upItem: 'upItem',
    downItem: 'downItem',
    changeItemText: 'changeItemText',
    addItem: 'addItem',
    textDanger: 'textDanger',
})

</script>

<template>
  <div class="wrapper">
    <div class="input__wrapper" v-for="(item, index) in items" v-bind:key="item.id">
        <div class="control">
          <button class="button button_check" :class="{ active: item.active }" @click="$emit('activeItem', item.id)"><img class="icon" src="./icons/img_3.png" alt="Галочка"></button>
        </div>
        <form @submit.prevent class="input__control">
          <div v-if="tooltipVisible" :key="item.id" class="tooltip__bubble">{{tooltipMsg}}</div>
          <input
            :class="{ textDanger: item.textDanger }"
            @keyup.enter="$emit('addItem', item.id, 'textDanger', item.id)"
            @keyup="$emit('changeItemText', item.id, $event.target.value)"
            type="text"
            class="input__text"
            placeholder="напишите задачу"
            :value="item.text"
          />
        </form>
        <div class="control">
          <button class="button button_up" :disabled="index===0" @click="$emit('upItem', item.id)"><img class="icon" src="./icons/img_2.png" alt="Стрелка вверх"></button>
        </div>
        <div class="control">
          <button class="button button_down" :disabled="index===(items.length - 1)" @click="$emit('downItem', item.id)"><img class="icon" src="./icons/img_1.png" alt="Стрелка вниз"></button>
        </div>
        <div class="control">
          <button class="button button_delete" @click="$emit('deleteItem', item.id)"><img class="icon" src="./icons/img.png" alt="Крестик"></button>
        </div>
    </div>
  </div>

</template>

<style scoped>
.input__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
}

.input__control {
  position: relative;
}

.input__text {
  position: relative;
  padding: 30px 40px;
  width: 600px;
  height: calc(2.25rem + 2px);
  font-size: 16px;
  line-height: 20px;
  border: 1px solid rgba(173, 241, 154, 0.66);
}

.input__text:focus {
  border: 1px solid rgba(173, 241, 154, 0.87);
}

.input__text::placeholder {
  color: #4c4a4a;
  opacity: 0.2;
}

.button {
  height: calc(2.25rem + 2px);
  padding: 30px 30px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button_check {
  background-color: rgba(255, 255, 255, 0.93);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid rgba(219, 220, 219, 0.55);
  background-image: url("./icons/ph13.gif");
  background-repeat: no-repeat;
  background-position: center;
}

.button_check:hover {
  background-color: rgba(249, 250, 249, 0.86);
  background-image: url("./icons/ph14.gif");
}

.button_check:focus {
    border: 1px solid rgba(251, 251, 251, 0.98);
}

.active {
  background-color: rgba(74, 230, 74, 0.77);
  background-image: url("./icons/ph16.gif");
}

.active:hover {
  background-color: rgba(74, 230, 74, 0.77);
  background-image: url("./icons/ph17.gif");
}


.textDanger {
  border: 1px solid rgba(237, 5, 5, 0.66);
}

.tooltip__bubble {
  padding: 13px 21px 8px 21px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: rgba(14, 1, 1, 0.71);
  background-color: rgba(186, 198, 250, 0.76);
  border-radius: 10px;
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.tooltip__bubble:before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: rgba(186, 198, 250, 0.76);
}

.button_up {
  background-color: rgba(109, 134, 234, 0.55);
  border: 1px solid rgba(109, 134, 234, 0.55);
  border-right: none;
  background-image: url("./icons/ph8.gif");
}

.button_up:hover {
  background-color: rgba(109, 134, 234, 0.83);
  background-image: url("./icons/ph9.gif");
}

.button_up:focus {
  border: 1px solid rgb(109, 134, 234);
}

.button_down {
  background-color: rgba(109, 134, 234, 0.55);
  border: 1px solid rgba(109, 134, 234, 0.55);
  border-right: none;
  background-image: url("./icons/ph11.gif");
}

.button_down:hover {
  background-color: rgba(109, 134, 234, 0.83);
  background-image: url("./icons/ph9.gif");
}

.button_down:focus {
  border: 1px solid rgb(109, 134, 234);
}

.button_delete {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid rgba(243, 25, 63, 0.55);
  background-image: url("./icons/ph_but_clos.gif");
}

.button_delete:hover {
  background-color: rgba(243, 25, 63, 0.79);
  background-image: url("./icons/ph12.gif");
}

.button_delete:focus {
  border: 1px solid rgb(243, 25, 63);
}

.control {
  margin: -1px;
}

.icon {
  width: 20px;
  height: 20px;
  font-weight: 500;
}
</style>
