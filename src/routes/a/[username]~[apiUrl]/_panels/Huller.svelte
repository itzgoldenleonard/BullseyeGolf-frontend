<script lang="ts">
	import Textfield from '@smui/textfield';
    import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
    let holes = ["hul1", "hul2", "hul3"];
</script>

<Accordion multiple>
    {#each holes as hole}
        <Panel>
            <Header>{hole}</Header>
            <Content>
                <Textfield variant="filled" value="" label="Hul sponsor" />
                <Textfield variant="filled" value="" label="Hul tekst" />
                <div class="hide-file-ui">
                    <Textfield variant="filled" value="" label="Hul billede" type="file" />
                </div>
            </Content>
        </Panel>
    {/each}
</Accordion>
