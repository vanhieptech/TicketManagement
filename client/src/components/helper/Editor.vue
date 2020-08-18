<template>
  <ckeditor v-model="data" :editor="editor" :config="config"></ckeditor>
</template>
<script>
let ClassicEditor;
if (process.client) {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
}

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
    };
  },
  computed: {
    data: {
      set(value) {
        this.editorData = value;
        this.$emit("input", value);
      },
      get() {
        return this.editorData;
      },
    },
  },

  created() {
    this.editorData = this.value;
  },
};
</script>
