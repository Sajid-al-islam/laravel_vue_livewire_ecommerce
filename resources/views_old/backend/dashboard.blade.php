<!DOCTYPE html>

<html class="loading dark-layout" lang="en" data-layout="dark-layout" data-textdirection="ltr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0,minimal-ui">
    <title>Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600"
        rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/vendors/css/vendors.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <script src="/js/sweat-alert.js"></script>
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/bootstrap-extended.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/colors.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/components.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/themes/dark-layout.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/themes/bordered-layout.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/themes/semi-dark-layout.min.css">

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/app-assets/css/core/menu/vertical-menu.min.css">
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('backend') }}/assets/css/style.css">
    <!-- END: Custom CSS-->
    <link rel="stylesheet" href="/css/tailwind/tailwind.css">
    <link rel="stylesheet" href="/css/backend.css">
    <script src="/js/vue/dashboard.js" defer></script>
    <script src="{{ asset('backend') }}/plugins/ckeditor/ckeditor.js"></script>

    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        window.s_alert = (title="success",icon='success') => {
            Toast.fire({
                icon,
                title
            })
        };
        window.s_confirm = async (title="Are you sure?",confirmButtonText='Yes, do it!',icon='warning') => {
            let result = await Swal.fire({
                title,
                text: "",
                icon,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText
            })
            return result.isConfirmed ? true : false;
        }
    </script>
</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="vertical-layout vertical-menu-modern  navbar-floating footer-static">

    <div id="app">
        <ex-app></ex-app>
    </div>

    @if(env('APP_DEBUG')==true)
        <button class="upload_demo_form" onclick="demo_data()" title="upload demo data into form element">
            <i class="fa-solid fa-upload text-info"></i>
        </button>
    @endif
    <!-- BEGIN: Footer-->
    <footer class="footer footer-static d-none footer-light">
        <p class="clearfix mb-0">
            <span class="float-md-start d-block d-md-inline-block mt-25  opacity-0">COPYRIGHT &copy; 2020
                <a class="ms-25" href="#" target="_blank">Hungry Coder</a>
                <span class="d-none d-sm-inline-block">All rights Reserved</span>
            </span>
            <span class="float-md-end d-none d-md-block">
                Hand-crafted & Made with
                <i data-feather="heart"></i>
            </span>
        </p>
    </footer>
    <button class="btn btn-primary btn-icon scroll-top" type="button"><i data-feather="arrow-up"></i></button>
    <!-- END: Footer-->

    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace.min.js"></script>
    <!-- BEGIN: Vendor JS-->
    {{-- <script src="{{ asset('backend') }}/app-assets/vendors/js/vendors.min.js"></script> --}}
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Theme JS-->
    {{-- <script src="{{ asset('backend') }}/app-assets/js/core/app-menu.min.js"></script> --}}
    {{-- <script src="{{ asset('backend') }}/app-assets/js/core/app.min.js"></script> --}}
    {{-- <script src="{{ asset('backend') }}/app-assets/js/scripts/customizer.min.js"></script> --}}
    <!-- END: Theme JS-->

</body>

</html>
