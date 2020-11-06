/**
 * Determines the length in words of a the keyphrase, the keyword is a keyphrase if it is more than one word.
 *
 * @param {Paper} paper 			The paper to research
 * @param {Researcher} researcher 	The researcher to use for analysis
 *
 * @returns {Object} The length of the keyphrase and whether the function words list is available or not.
 */
export default function( paper, researcher ) {
	const topicForms = researcher.getResearch( "morphology" );
	const functionWords = researcher.getConfig( "functionWords" );

	return {
		keyphraseLength: topicForms.keyphraseForms.length,
		functionWords: functionWords,
	};
}
