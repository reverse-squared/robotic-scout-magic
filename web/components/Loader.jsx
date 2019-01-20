import React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export {
    Loader,
    PageLoadable,
    AppLoadable,
};