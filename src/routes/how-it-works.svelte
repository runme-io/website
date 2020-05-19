<script>
  import MainLayout from '../components/UI/Layout/MainLayout.svelte'
  import Code from '../components/UI/Code.svelte'
</script>

<MainLayout title="How it works">
  <div class="main-content">
    <h1>How it works</h1>

    <p>RunMe is a service to run and demonstrate your application in one click.</p>

    <p><img width="600" src="/images/runme_how_it_works.png" alt="scheme how it works"/></p>

    <h2>Step 1</h2>
    <p>When you click on Runme button we will clone your repo locally</p>

    <h2>Step 2</h2>
    <p>On step 2 we have several flows:</p>
    <ol>
      <li>if your repo has Dockerfile in root directory we will use it to build docker image;</li>
      <li>if you pass a path to already built docker image we will skip this step and just run your docker image;</li>
      <li>
          if points 1 and 2 are not applicable, we will use our default Dockerfile. Default Dockerfile will try to run your repository as NodeJS (v12.10) repository which has package.json with 3 main commands:
          <Code lang="bash" code={`npm install
npm run build
npm run start`}
          />
      </li>
    </ol>

    <h2>Step 3</h2>
    <p>Then we push your repository to the build environment and start building. The local copy of your repository, that we have made, will be deleted.</p>

    <h2>Step 4</h2>
    <p>The build system pushes docker image to our docker registry.</p>

    <h2>Step 5</h2>
    <p>Kubernetes cluster placed in DigitalOcean will pull this docker image and deploy it. Also, Kubernetes will create Let’s Encrypt SSL certificate for your application.</p>

    <h2>Step 6</h2>
    <p>After deployment, Runme will get an event with result</p>

    <h2>Step 7</h2>
    <p>Runme will generate a unique URL for your application and create an "A record" for it. Then we will show you the result.</p>

    <h2>Cleanup</h2>
    <p>Runme will automatically remove applications after 10 minutes and clean up our cluster.</p>

    <p>
      It is free.<br>
      Happy coding! :)
    </p>
  </div>
</MainLayout>
