<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { Message } from './geminiFormat';
  import {onMount} from 'svelte';


  import { toGeminiFormat } from './geminiFormat';
 

let inputElement: HTMLInputElement | null = null;
let history : Message[] = [];
let inputText = '';
let isLoading = false;
let error: string | null = null;

// Focus and select the input element when it is enabled
$: if (!isLoading && inputElement) {
  inputElement.focus();
  inputElement.select();
}

// Fetch initial response from the server when the component mounts
  onMount(async () => {
    isLoading = true;
    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: "" }] // or a greeting, or leave empty for system prompt only
            }
          ]
        })
      });
      const data = await response.json();
      history = [
        ...history,
        { role: 'model', text: data.geminiResponse }
      ];
    } catch (e) {
      error = "Failed to get initial response.";
    } finally {
      isLoading = false;
    }
  });



async function sendMessage() {
  error = null;
  const trimmedText  = inputText.trim();
  if (!trimmedText) return;

  history = [...history, { role: 'user', text: trimmedText }];
  inputText = '';
  isLoading = true;


  try {
    const response = await fetch("http://localhost:4000/api/chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: toGeminiFormat(history)
      })
    });

    if (!response.ok) {
      throw new Error((await response.json()).error || 'Failed to send message');
    }

    const data = await response.json();
    history = [...history, { role: 'model', text: data.geminiResponse }];
  } catch (error) {
    console.error('Error sending message:', error);
    error = 'Failed to send message. Please try again.';
  } finally {
    isLoading = false;
      // inputElement?.focus();


  }
}
function handleEnterKey (event: KeyboardEvent) {
    if (event.key === 'Enter' && !isLoading) {
      // event.preventDefault();
      sendMessage();
    }
  }


</script>

<main>
  <h1> Turners Insurance Chat</h1>
  <div class="window">
    {#each history as message}
      <div class="chat-message {message.role}">
        <b>{message.role === 'user' ? 'You' : 'Tina'}:</b> 
        {#if message.role === 'model'}
        <SvelteMarkdown source={message.text}/>
        {:else}
          {message.text}
        {/if}
      </div>
    {/each}
    {#if isLoading}
      <div class="chat-message model"><b>Tina:</b> <em>Thinking...</em></div>
    {/if}
  </div>
  <div class="input-area">
    <input
      type="text"
      bind:this={inputElement}
      bind:value={inputText}
      on:keydown={handleEnterKey}
      placeholder="Type your message..."
      disabled={isLoading}
      autocomplete="off"
    />
    <button on:click={sendMessage} disabled={isLoading || !inputText.trim()}>Send</button>
  </div>
  {#if error}
    <div class="error">{error}</div>
  {/if}

</main>

<style src='./styles/styles.css'>

</style>
