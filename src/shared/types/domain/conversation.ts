/**
 * Types related to the domain concept of an AI Conversation,
 * including messages and the state manager.
 */
import { ApiResult } from '../api/result';

/**
 * Represents a single message within a conversation turn.
 * Follows the structure commonly used by AI APIs like Anthropic and OpenAI.
 */
export interface ConversationMessage {
    /**
     * The role of the entity sending the message.
     * 'user': Message from the human user.
     * 'assistant': Message generated by the AI model.
     * 'system': (Optional, less common in direct turns) Initial instructions or context.
     */
    role: 'user' | 'assistant' | 'system';

    /** The textual content of the message. */
    content: string;
}

/**
 * Defines the interface for a Conversation Manager.
 * This object encapsulates the state (message history) and behavior (initialization, continuation)
 * of a specific conversation session related to a prompt.
 */
export interface ConversationManager {
    /** The ID of the prompt that initiated or guides this conversation. */
    promptId: string;

    /** An array holding the sequence of messages exchanged so far in the conversation. */
    messages: ConversationMessage[];

    /**
     * Initializes the conversation by processing the initial prompt with user inputs.
     * Sends the first message(s) to the AI model.
     *
     * @param userInputs - A record mapping variable names to their resolved values.
     * @returns A promise resolving to an ApiResult containing the AI's first response (string) or an error.
     */
    initializeConversation: (userInputs: Record<string, string>) => Promise<ApiResult<string>>;

    /**
     * Continues the conversation with new input from the user.
     * Appends the user input and the subsequent AI response to the message history.
     *
     * @param userInput - The text provided by the user for this turn.
     * @returns A promise resolving to an ApiResult containing the AI's response (string) or an error.
     */
    continueConversation: (userInput: string) => Promise<ApiResult<string>>;
}
