<script lang="ts">
	import Textfield from '@smui/textfield';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Chip, { Set, Text } from '@smui/chips';

	let choices: String[] = [];
	for (let i = 1; i <= 18; i++) {
		choices.push(`Hul ${i}`);
	}
	let selected: String[] = [];
	let holes = ['hul1', 'hul2', 'hul3'];
</script>

<article>
	<h1>Vælg huller</h1>
	<Set chips={choices} let:chip filter bind:selected>
		<Chip {chip} touch>
			<Text>{chip}</Text>
		</Chip>
	</Set>

	<h1>Valgte huller</h1>
	<Accordion multiple>
		{#each holes as hole}
			<Panel>
				<Header>{hole}</Header>
				<Content>
					<div class="hide-file-ui">
						<Textfield variant="filled" value="" label="Hul sponsor" />
						<Textfield variant="filled" value="" label="Hul tekst" />
						<Textfield variant="filled" value="" label="Hul billede" type="file" />
					</div>
				</Content>
			</Panel>
		{/each}
	</Accordion>
</article>

<style lang="scss">
	article {
		padding: 10px;
	}
</style>
