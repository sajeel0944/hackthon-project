// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const path = url.pathname;

//   // Cookies
//   const isDoctorLoggedIn = request.cookies.get("isDoctorLoggedIn")?.value === 'true';
//   const isPatientLoggedIn = request.cookies.get("isPatientLoggedIn")?.value === 'true';
//   const isAdministrationLoggedIn = request.cookies.get("isAdministrationLoggedIn")?.value === 'true';

//   // Publicly accessible login routes
//   const publicPaths = [
//     '/doctor/doctor-login',
//     '/patient/patient-login',
//     '/administration/login',
//     '/',
//     '/services',
//   ];

//   // ✅ Allow public pages
//   if (publicPaths.includes(path)) {
//     return NextResponse.next();
//   }

//   // 🔐 Protect /doctor routes
//   if (path.startsWith('/doctor')) {
//     if (!isDoctorLoggedIn) {
//       return NextResponse.redirect(new URL('/doctor/doctor-login', request.url));
//     }

//     // Block if patient or administration logged in
//     if (isPatientLoggedIn) {
//       return NextResponse.redirect(new URL('/patient', request.url));
//     }

//     if (isAdministrationLoggedIn) {
//       return NextResponse.redirect(new URL('/administration', request.url));
//     }

//     return NextResponse.next();
//   }

//   // 🔐 Protect /patient routes
//   if (path.startsWith('/patient')) {
//     if (!isPatientLoggedIn) {
//       return NextResponse.redirect(new URL('/patient/patient-login', request.url));
//     }

//     if (isDoctorLoggedIn) {
//       return NextResponse.redirect(new URL('/doctor', request.url));
//     }

//     if (isAdministrationLoggedIn) {
//       return NextResponse.redirect(new URL('/administration', request.url));
//     }

//     return NextResponse.next();
//   }

//   // 🔐 Protect /administration routes
//   if (path.startsWith('/administration')) {
//     if (!isAdministrationLoggedIn) {
//       return NextResponse.redirect(new URL('/administration/login', request.url));
//     }

//     if (isDoctorLoggedIn) {
//       return NextResponse.redirect(new URL('/doctor', request.url));
//     }

//     if (isPatientLoggedIn) {
//       return NextResponse.redirect(new URL('/patient', request.url));
//     }

//     return NextResponse.next();
//   }

//   // ❌ Any other route redirect to /
//   return NextResponse.redirect(new URL('/', request.url));
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|api).*)',
//   ],
// };




// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  // Cookies
  const isDoctorLoggedIn = request.cookies.get("isDoctorLoggedIn")?.value === 'true';
  const isPatientLoggedIn = request.cookies.get("isPatientLoggedIn")?.value === 'true';
  const isAdministrationLoggedIn = request.cookies.get("isAdministrationLoggedIn")?.value === 'true';
  const hasPatientSharedDetails = request.cookies.get("patientSharedWithDoctor")?.value === 'true';

  // Publicly accessible login routes
  const publicPaths = [
    '/doctor/doctor-login',
    '/patient/patient-login',
    '/administration/login',
    '/',
    '/services',
  ];

  // ✅ Allow public pages
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // 🔐 Protect /doctor routes
  if (path.startsWith('/doctor')) {
    if (!isDoctorLoggedIn) {
      return NextResponse.redirect(new URL('/doctor/doctor-login', request.url));
    }

    // Block if patient or administration logged in
    if (isPatientLoggedIn) {
      return NextResponse.redirect(new URL('/patient', request.url));
    }

    if (isAdministrationLoggedIn) {
      return NextResponse.redirect(new URL('/administration', request.url));
    }

    // 🔐 Special Protection: Doctor trying to access patient details
    if (path.startsWith('/doctor/patient') && path !== '/doctor/patient-login') {
      if (!hasPatientSharedDetails) {
        // Patient hasn't shared details yet
        return NextResponse.redirect(new URL('/doctor/patient-login', request.url));
      }
    }

    return NextResponse.next();
  }

  // 🔐 Protect /patient routes
  if (path.startsWith('/patient')) {
    if (!isPatientLoggedIn) {
      return NextResponse.redirect(new URL('/patient/patient-login', request.url));
    }

    if (isDoctorLoggedIn) {
      return NextResponse.redirect(new URL('/doctor', request.url));
    }

    if (isAdministrationLoggedIn) {
      return NextResponse.redirect(new URL('/administration', request.url));
    }

    return NextResponse.next();
  }

  // 🔐 Protect /administration routes
  if (path.startsWith('/administration')) {
    if (!isAdministrationLoggedIn) {
      return NextResponse.redirect(new URL('/administration/login', request.url));
    }

    if (isDoctorLoggedIn) {
      return NextResponse.redirect(new URL('/doctor', request.url));
    }

    if (isPatientLoggedIn) {
      return NextResponse.redirect(new URL('/patient', request.url));
    }

    return NextResponse.next();
  }

  // ❌ Any other route redirect to /
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};
