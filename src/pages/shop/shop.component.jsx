import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { updateCollections } from '../../redux/shop/shop.actions'

class shopPage extends React.Component {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;

        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapShot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
            console.log(collectionsMap)
            updateCollections(collectionsMap)
        })
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shopPage'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(shopPage);