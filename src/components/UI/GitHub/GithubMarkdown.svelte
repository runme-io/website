<script>
  import { onDestroy, onMount } from 'svelte'
  import GitUrlParse from 'git-url-parse'
  import marked from 'marked'
  import { fetchReadme } from '@varandas/fetch-readme'
  import RunmeButton from '../../Runme/RunmeButton.svelte'
  import { application } from '../../Stores/Application'
  import { setUrl } from '../../../Helpers'

  let content
  let runUrl
  let unsubscribe = () => {}
  const ipsum = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim pellentesque neque eget gravida.
  In non lacus in elit aliquam iaculis. Curabitur vel velit efficitur, rhoncus tortor porttitor, dapibus nibh. Fusce efficitur,
  lorem sit amet sollicitudin blandit, nisl odio tempor ligula, et posuere ante elit ut felis. Morbi felis justo, congue a fringilla vitae,
  bibendum iaculis nisi. Nullam turpis purus, tempor sit amet eros vel, sagittis accumsan libero. Class aptent taciti sociosqu ad litora torquent
  per conubia nostra, per inceptos himenaeos. Nunc id luctus nibh. Cras cursus auctor urna, id posuere est blandit id. Nam ut dapibus mauris.
  Cras mattis venenatis urna. In hac habitasse platea dictumst. Mauris eros mauris, convallis eget malesuada eget, gravida ac massa. Vestibulum
  luctus ligula libero, sed ornare mi tincidunt a.</p>

  <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis nec est eu quam semper pretium.
  In sollicitudin augue sit amet viverra elementum. Phasellus ultrices, nisi nec semper auctor, felis orci molestie felis,
  in bibendum orci sapien eu erat. Sed at lorem ac massa convallis auctor. Aliquam id nunc quis odio rutrum dictum. Suspendisse
  pellentesque rutrum scelerisque. Curabitur sed ex sit amet massa mollis luctus eu in ex. Vivamus quis malesuada turpis.
  Maecenas justo massa, iaculis vitae velit sed, venenatis semper odio. Nunc lectus sem, pellentesque vel luctus id, placerat
  vel urna. Praesent placerat odio in interdum accumsan. Vivamus auctor turpis ac dui dignissim, et maximus ex consectetur.
  In vitae ornare ipsum, eu luctus turpis.</p>`

  onMount(() => {
    unsubscribe = application.subscribe(({
      error,
      repo_url: repoUrl,
      id,
      repo_name: repoName,
      repo_branch: branch,
    }) => {
      if (!repoUrl || error) { return }

      const { owner, name } = GitUrlParse(repoUrl)

      // fetch and parse the markdown
      fetchReadme({
        username: owner,
        repository: name,
        branch,
      })
        .then(response => (content = marked(response)))
        .catch(() => (content = `<h1>${repoName}</h1><p>${ipsum}</p>`))

      // set the run url to build the application
      runUrl = setUrl(`run?app_id=${id}`)
    })
  })

  onDestroy(() => {
    unsubscribe()
  })
</script>

<style lang="scss" global>
  @import "./node_modules/@primer/css/markdown/index.scss";

  .markdown-body {
    max-height: 30rem;
    overflow: hidden;
    position: relative;

    table {
      border-spacing: 0;
      border-collapse: collapse;
    }

    .fade {
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 20rem;

      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
        100%
      );
    }
  }
</style>

<div class="markdown-body">
  <p>
    <RunmeButton href={runUrl}/>
  </p>

  {@html content}

  <div class="fade"></div>
</div>
