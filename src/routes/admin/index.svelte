<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';

	import AccordionJson from '$lib/components/containers/accordions/AccordionJSON.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { Game } from '$lib/scripts/classes/game';
	import { PickSixDoc, WeeklyPickDoc } from '$lib/scripts/classes/picks';
	import { Player } from '$lib/scripts/classes/player';
	import { PlayerRecord, SeasonRecord } from '$lib/scripts/classes/playerRecord';
	import { Pool } from '$lib/scripts/classes/pool';
	import { RuleCategory } from '$lib/scripts/classes/rules';
	import { SeasonBoundDoc } from '$lib/scripts/classes/seasonBound';
	import { Survivor } from '$lib/scripts/classes/survivor';
	import { Team } from '$lib/scripts/classes/team';
	import { WeeklyTiebreaker } from '$lib/scripts/classes/tiebreaker';
	import { WeekBoundDoc } from '$lib/scripts/classes/weekBound';
	import { pick6RulesCollection, weeklyRulesCollection } from '$lib/scripts/firebase/collections';
	import { firestoreDB } from '$lib/scripts/firebase/firebase';
	import { toastIt } from '$scripts/toasts';
	import {
		collection,
		CollectionReference,
		doc,
		getDocs,
		query,
		Query,
		QueryConstraint,
		type DocumentData
	} from '@firebase/firestore';

	let openNewPlayerForm: () => Promise<void>;
	const collections = [
		{ name: 'Games', interface: new Game({}) },
		{ name: 'Pick6Rules', interface: new RuleCategory({ rules: pick6RulesCollection }) },
		{ name: 'PickSix', interface: new PickSixDoc({}) },
		{ name: 'Players', interface: new Player({}) },
		{ name: 'Pools', interface: new Pool() },
		{ name: 'SeasonRecords', interface: new SeasonRecord({}) },
		{ name: 'SeasonScheduleBounds', interface: new SeasonBoundDoc({}) },
		{ name: 'Survivor', interface: new Survivor({}) },
		{ name: 'Teams', interface: new Team({}) },
		{ name: 'Toasts', interface: {} },
		{ name: 'WeekScheduleBounds', interface: new WeekBoundDoc({}) },
		{ name: 'WeeklyPicks', interface: new WeeklyPickDoc({}) },
		{ name: 'WeeklyRecords', interface: new PlayerRecord({}) },
		{ name: 'WeeklyRules', interface: new RuleCategory({ rules: weeklyRulesCollection }) },
		{ name: 'WeeklyTiebreakers', interface: new WeeklyTiebreaker({}) }
	];
	let selected_collection: { name: string; interface: unknown };
	let query_constraints: QueryConstraint[] = [];
	let query_promise: Promise<DocumentData[]>;
	let selected_doc: DocumentData;
	let filters: { key: string; value: string }[] = [];

	async function queryCollection() {
		let collection_ref: CollectionReference = collection(firestoreDB, selected_collection.name);
		let q: Query = query(collection_ref, ...query_constraints);
		let snapshot = await getDocs(q);
		let collection_doc_data = snapshot.docs.map((doc) => {
			return { id: doc.id, ref: doc.ref.path, ...doc.data() };
		});
		return collection_doc_data;
	}
	async function getData() {
		query_promise = queryCollection();
		docs = await query_promise;
	}
	async function handleFilter(key: string, value: string) {
		const filter = filters?.find((filter) => filter.key === key);
		filter.value = value;
		filters = [...filters];
	}
	function filter_docs(doc: DocumentData, filters: { key: string; value: string }[]) {
		for (const filter of filters) {
			const { key, value } = filter;
			if (doc[key] === undefined || doc[key] === null) {
				return false;
			}
			if (value !== '') {
				if (typeof doc[key] === 'string') {
					console.log('doc[key]', doc[key]);
					const result = doc[key]?.includes(value);
					console.log('string comparison result:', result);
					return result;
				} else if (typeof doc[key] === 'number') {
					const result = doc[key] === parseInt(value);
					console.log('number comparison result:', result);
					return result;
				} else if (typeof doc[key] === 'boolean') {
					const value_as_boolean = value === 'true';
					const result = doc[key] === value_as_boolean;
					console.log('boolean comparison result:', result);
					return result;
				}
			}
		}
		return true;
	}
	$: console.log('filters', filters);
	$: if (selected_collection) {
		filters = Object.keys(selected_collection.interface).map((key) => {
			return { key, value: '' };
		});
	}
	let docs: DocumentData[] = [];
</script>

<PageTitle>Admin</PageTitle>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<NewPlayerForm bind:openNewPlayerForm />
{#if selected_collection}
	<section class="absolute">
		{#each Object.keys(selected_collection.interface).sort() as key, i}
			<label for={i.toString()}>
				{key}
				{#if typeof selected_collection.interface[key] === 'string'}
					<input
						name={i.toString()}
						type="text"
						placeholder={key}
						on:input={(e) => handleFilter(key, e.currentTarget.value)}
					/>
				{:else if typeof selected_collection.interface[key] === 'number'}
					<input
						name={i.toString()}
						type="number"
						placeholder={key}
						on:input={(e) => handleFilter(key, e.currentTarget.value)}
					/>
				{:else if typeof selected_collection.interface[key] === 'boolean'}
					<select name={i.toString()} on:select={(e) => handleFilter(key, e.currentTarget.value)}>
						<option value={null} disabled>{key}</option>
						<option value={true}>true</option>
						<option value={false}>false</option>
					</select>
				{:else}
					({typeof selected_collection.interface[key]})
				{/if}
			</label>
		{/each}
	</section>
{/if}
<Grid>
	<button on:click={openNewPlayerForm}>Open New Player Form</button>
	<button on:click={() => toastIt('Test Toast!', `Here's to you, bold adventurer!`)}
		>Toast It!</button
	>
	<label for="collection">
		Collection
		<select name="collection" bind:value={selected_collection}>
			{#each collections as collection}
				<option value={collection}>{collection.name}</option>
			{/each}
		</select>
		<button on:click={getData}>Query Collection</button>
	</label>
	{#if query_promise}
		{#await query_promise then docs}
			<label for="document">
				Document
				<select name="document" bind:value={selected_doc}>
					<option value={null}>All</option>
					{#each docs as doc}
						<option value={doc}>{doc.id}</option>
					{/each}
				</select>
			</label>
		{/await}
	{/if}
</Grid>
{#if query_promise}
	{#await query_promise then docs}
		{#if selected_doc}
			{#each Object.entries(selected_doc).sort() as [key, value] (key)}
				<p class="centered"><AccordionJson {key} {value} /></p>
			{/each}
		{:else}
			<!-- {#key filters} -->
			{#each docs.filter((d) => filter_docs(d, filters)) as doc}
				<Grid minColumns={'min(100%,35rem)'}>
					<AccordionDetails
						expanderIconSide={'left'}
						cloudyBackground={false}
						expandTitle={`${doc.id}`}
						customSummaryStyles="padding:1rem; width: 100%;"
						customContentStyles={`scrollbar-width: thin;`}
					>
						<svelte:fragment slot="content">
							{#each Object.entries(doc).sort() as [key, value] (key)}
								<AccordionJson {key} {value} />
							{/each}
						</svelte:fragment>
					</AccordionDetails>
				</Grid>
			{/each}
			<!-- {/key} -->
		{/if}
	{/await}
{/if}

<style lang="scss">
	button {
		@include styledButton;
		width: max-content;
	}
	select,
	input {
		@include defaultInput;
	}
	input[type='text'] {
		display: inline-flex;
	}
	.centered {
		place-items: center;
		place-self: center;
		margin: auto;
	}
	label {
		display: grid;
		gap: 0.5rem;
	}
	.absolute {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: 1fr 1fr;
		position: absolute;
		top: 10%;
		left: 1rem;
		width: min(100vw, 25rem);
		height: 100%;
	}
</style>
