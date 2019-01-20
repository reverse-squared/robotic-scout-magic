import React from 'react';
import Loadable from 'react-loadable';
import { CircularProgress } from '@material-ui/core';

const Loader = () => <div className='container' style={{
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
}}>
    <CircularProgress />
</div>;

const PageLoadable = (dynamic_import) => Loadable({ loader: dynamic_import, loading: Loader });

const AppLoadable = (App) => Loadable({
    loader: () => fetch('./all-forms.json').then(res => res.json()).then(json => {
        return () => <App formData={json} />;
    }),
    loading: Loader,
});

const AnyIconLoader = ({ icon }) => {
    const Loader = Loadable({
        loader: () => import('./AnyIcon').then(AnyIcon => {
            return () => <AnyIcon.default icon={icon} />;
        }),
        loading: () => null
    });
    return <Loader />;
};


export {
    Loader,
    PageLoadable,
    AppLoadable,
    AnyIconLoader
};