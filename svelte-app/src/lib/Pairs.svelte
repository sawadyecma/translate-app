<script lang="ts">
  import Button, { Group, Label } from "@smui/button";
  export let pairs: { en: string; ja: string }[];
  let kind: "onlyEn" | "vertical" | "horizontal" = "onlyEn";
</script>

<div>
  <Group variant="raised">
    <Button on:click={() => (kind = "onlyEn")} variant="raised">
      <Label>英語だけ</Label>
    </Button>
    <Button on:click={() => (kind = "vertical")} variant="raised">
      <Label>縦並び</Label>
    </Button>
    <Button on:click={() => (kind = "horizontal")} variant="raised">
      <Label>横並び</Label>
    </Button>
  </Group>

  {#if kind === "horizontal"}
    <table>
      {#each pairs as pair}
        <tr>
          <td style="border-bottom: 1px solid gray">{pair.en}</td>
          <td style="border-bottom: 1px solid gray">{pair.ja}</td>
        </tr>
      {/each}
    </table>
  {:else}
    <ul style="list-style-type: none;">
      {#each pairs as pair}
        <li>
          <p style="height: 0.8rem;">{pair.en}</p>
          <span style="height: 0.5rem;color: gray;font-size: 0.5rem">
            {#if kind !== "onlyEn"}
              {pair.ja}
            {/if}
          </span>
        </li>
        <hr style="height:0.5px" />
      {/each}
    </ul>
  {/if}
</div>
