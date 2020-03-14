<script>
    import { parse } from 'qs';
    import { goto } from '@sapper/app'

    // TODO check on SSR, this is client code
    if (typeof window !== 'undefined') {
        const parsed = parse(window.location.search.replace('?', ''));

        // no repo url? Redirect back
        if (!Object.keys(parsed).includes('app_id')) {
            goto('/')
        }

        const { app_id } = parsed;

        fetch(`https://svc.runme.io/v1/apps/${app_id}/run`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                return response.json();
            })
            .then(({ build_id }) => {
                goto(`/build?build_id=${build_id}`)
            });
    }
</script>
