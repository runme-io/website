<script>
    import { parse } from 'qs';
    import { goto } from '@sapper/app'

    let parsed = {};

    if (typeof window !== 'undefined') {
        parsed = parse(window.location.search.replace('?', ''));

        // no repo url? Redirect back
        if (!Object.keys(parsed).includes('app_id')) {
            goto('/')
        }

        const { app_id } = parsed;

        // fetch(`https://svc.runme.io/v1/apps/{app_id}/run`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }),
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then(({ build_id }) => {
        //         console.log(data);
        //         goto(`/build?build_id=${build_id}`)
        //     });

    }
</script>
