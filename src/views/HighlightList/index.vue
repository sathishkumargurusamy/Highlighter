<template>
  <div class="highlight-container f-column w-full">
    {{ highlightedWords }}
    <div></div>
    <q-list
      v-for="word in highlightedWords"
      :key="word"
      bordered
      class="rounded-borders"
    >
      <q-expansion-item expand-icon-toggle expand-separator :label="word">
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item></q-list
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HighlightPosts",
  computed: {
    ...mapGetters(["highlightedWords"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.highlight-container {
  background: $primary-color;
  justify-content: flex-start;
  align-items: center;
  min-height: calc(100vh - 132px);
  padding: 30px;
}
</style>
