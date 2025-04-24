/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps,InspectorControls } from '@wordpress/block-editor';
import{ Panel,PanelBody,ToggleControl } from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import BookList from '../components/BookList';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { showContent, showImage } = attributes;
	//const attributes = props.attributes;

	const books = useSelect( ( select )=>{
		return(
			select( coreDataStore ).getEntityRecords( 'postType', 'book' )
		)
	},[]);

	const setShowImageHandler = ( val )=>{
		setAttributes( { showImage: val } );	
	};

	const setShowContentHandler = ( val )=>{
		setAttributes( { showContent: val } );	
	};

	return (
		<div { ...useBlockProps() }>

			<InspectorControls>
				<Panel>
					<PanelBody title={__( 'Settings','my-reading-list' )} >
						<ToggleControl
							label={__( 'Show image', 'my-reading-list' )}
							checked={ attributes.showImage }
							onChange={ setShowImageHandler }
						/>
						<ToggleControl
							label={__( 'Show content', 'my-reading-list' )}	
							checked={ attributes.showContent }
							onChange={ setShowContentHandler }
						/>				
					</PanelBody>
				</Panel>
			</InspectorControls>

			<p>{__('My Reading List – hello from the editor!', 'my-reading-list')}</p>
            <BookList books={ books } attributes={ attributes }	/>
		</div>
	);
	
	
}
