<script lang="ts">
  export let pairs: { en: string; ja: string }[];
</script>

<div>
  <ul>
    {#each pairs as pair}
      <li>
        <p>{pair.en}</p>
        <p>{pair.ja}</p>
      </li>
    {/each}
  </ul>
</div>
