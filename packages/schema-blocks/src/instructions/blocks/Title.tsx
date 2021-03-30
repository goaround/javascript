import { BlockInstance } from "@wordpress/blocks";
import { select } from "@wordpress/data";
import { __, sprintf } from "@wordpress/i18n";

import { VariableTagRichText } from "./VariableTagRichText";
import { BlockValidation, BlockValidationResult } from "../../core/validation";
import BlockInstruction from "../../core/blocks/BlockInstruction";
import { BlockPresence } from "../../core/validation/BlockValidationResult";

/**
 * Interface for a WordPress post object.
 */
interface Post {
	title: string;
}

/**
 * Job title instruction.
 * Is invalid when its contents is the same as the post title.
 */
class Title extends VariableTagRichText {
	public options: {
		tags: ( keyof HTMLElementTagNameMap )[] | Record<string, keyof HTMLElementTagNameMap>;
		name: string;
		blockName: string;
		class: string;
		default: string;
		placeholder: string;
		keepPlaceholderOnFocus?: boolean;
		multiline: boolean;
		label: string;
		value: string;
	};

	/**
	 * Checks whether the given block and post have the same title.
	 *
	 * @param block The block.
	 * @param post The post.
	 *
	 * @returns If the block and post have the same title.
	 */
	private hasSameTitle( block: BlockInstance, post: Post ): boolean {
		const blockTitle = block.attributes[ this.options.name ];
		const postTitle = post.title;

		return blockTitle.toLocaleLowerCase() === postTitle.toLocaleLowerCase();
	}

	/**
	 * Checks if the instruction block is valid.
	 *
	 * @param blockInstance The attributes from the block.
	 *
	 * @returns The validation result.
	 */
	validate( blockInstance: BlockInstance ): BlockValidationResult {
		const post: Post = select( "core/editor" ).getCurrentPost();

		if ( this.hasSameTitle( blockInstance, post ) ) {
			return new BlockValidationResult(
				blockInstance.clientId,
				blockInstance.name,
				// 'Only' a warning, so the instruction is still valid.
				BlockValidation.Valid,
				BlockPresence.Recommended,
				sprintf(
					/* Translators: %s expands to the block's name. */
					__( "Post title and %s are the same.", "yoast-schema-blocks" ),
					this.options.blockName,
				),
			);
		}

		return BlockValidationResult.Valid( blockInstance );
	}
}

BlockInstruction.register( "title", Title );
