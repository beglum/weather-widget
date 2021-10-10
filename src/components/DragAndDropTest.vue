<template>
  <div v-drag-and-drop:options="dragOptions">
    <vue-draggable-group
      v-model="groups[0].items"
      :groups="groups"
      :data-id="groups[0].id"
    >
      <ul :data-id="groups[0].id">
        <li v-for="item in groups[0].items" :key="item.id" :data-id="item.id">{{item.name}}</li>
      </ul>
    </vue-draggable-group>
  </div>
</template>

<script>
export default {
  name: "DragAndDropTest",
  data: () => ({
    dragOptions: {
      showDropzoneAreas: true,
      onDrop: function(event) {
        console.log('drop', event)
      },
      onDragstart: function() {
        console.log('Dragstart')},
      onDragend: function(event) {
        // this.componentInstance.someDummyMethod();
        console.log('onDragend', event)}
    },
    groups: [
      {
        id: 1,
        items: [
          { id: 1, name: 'Item 1', groupId: 1},
          { id: 2, name: 'Item 2', groupId: 1},
          { id: 3, name: 'Item 3', groupId: 1},
        ]
      }
    ],
  })
}
</script>

<style scoped>

</style>