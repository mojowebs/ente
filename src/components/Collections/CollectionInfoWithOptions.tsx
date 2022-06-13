import { CollectionInfo } from './CollectionInfo';
import React from 'react';
import { Collection, CollectionSummary } from 'types/collection';
import CollectionOptions from 'components/Collections/CollectionOptions';
import { SetCollectionNamerAttributes } from 'components/Collections/CollectionNamer';
import { SPECIAL_COLLECTION_TYPES } from 'constants/collection';
import { SpaceBetweenFlex } from 'components/Container';
import { CollectionInfoBarWrapper } from './styledComponents';

interface Iprops {
    activeCollection: Collection;
    collectionSummary: CollectionSummary;
    setCollectionNamerAttributes: SetCollectionNamerAttributes;
    showCollectionShareModal: () => void;
    redirectToAll: () => void;
}

interface Iprops {
    collectionSummary: CollectionSummary;
    setCollectionNamerAttributes: SetCollectionNamerAttributes;
    activeCollection: Collection;
    showCollectionShareModal: () => void;
    redirectToAll: () => void;
}
export default function CollectionInfoWithOptions({
    collectionSummary,
    ...props
}: Iprops) {
    if (!collectionSummary) {
        return <></>;
    }

    const { name, type, fileCount } = collectionSummary;

    return (
        <CollectionInfoBarWrapper>
            <SpaceBetweenFlex>
                <CollectionInfo name={name} fileCount={fileCount} />
                {!SPECIAL_COLLECTION_TYPES.has(type) && (
                    <CollectionOptions {...props} />
                )}
            </SpaceBetweenFlex>
        </CollectionInfoBarWrapper>
    );
}
