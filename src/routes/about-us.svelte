<script>
    import MainLayout from '../components/UI/Layout/MainLayout.svelte'
</script>

<MainLayout title="About us">
    <div class="main-content">
        <h1>About Us</h1>

        <p>Hello professional!</p>

        <p>RunMe is an initiative of Jexia and DigitalOcean to provide developers an opportunity to run applications in an easy way.
            We want to give next-level experience in deployment for applications as well as the possibility to make quick test and sharing your app with your friends, colleagues, and visitors of your repo.</p>

        <p><a href="https://jexia.com" target="_blank">Jexia</a> - it is a platform, which is providing the set of highly integrated services for your backend, as well as hosting for your applications.</p>

        <p>Next services are available:</p>

        <h2>Dataset</h2>
        <p>is used to store your application data. You can create as many Dataset as you need as well as set up relations between them. No needs to worry about security, scalability, and performance. We will take care of this.</p>

        <h2>Fileset</h2>
        <p>is used to manage files for your application. We have integration with DigitalOcean and Amazon S3.</p>

        <h2>Channels</h2>
        <p>is used to organize <strong>Pub/Sub</strong> solutions. With this module, you can have real-time notification when your data will be changed.</p>

        <h2>Project Users</h2>
        <p>module provides functions, which you need for user management in your application. For example <strong>change password</strong>, <strong>sing up</strong>, <strong>sign in</strong>, <strong>groups</strong>, others.</p>

        <h2>Automation</h2>
        <p>this module allows you to set an actions that will run based on some event.</p>

        <h2>API-Keys</h2>
        <p>module allow you to generate API-Keys for your application and organize access to your data for 3rd party applications.</p>

        <h2>Policy</h2>
        <p>this module allow you to configure access rule to your data. We support actions and filters, so you can make a flexible granular setup.</p>
    </div>
</MainLayout>
