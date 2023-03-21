import gsap from 'gsap'
import { Vector3 } from 'webgi'

export function scrollAnimation(position : Vector3, target: Vector3, isMobile: boolean, onUpdate: () => void) {
    const tl = gsap.timeline()

    console.log(isMobile)

    tl.to(position, {
        x: !isMobile ? -8 : -7,
        y: !isMobile ? -12 : -12.2,
        z: !isMobile ? -5 : -6,
        scrollTrigger: {
            trigger: ".sound-section-content",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
        onUpdate
    })
    .to(target, {
        x: !isMobile ? 2 : 0.7,
        y: !isMobile ? 0.0 : 1.9,
        z: !isMobile ? -1 : 0.7,
        scrollTrigger: {
            trigger: ".sound-section-content",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
        onUpdate
    })
    .to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            trigger: ".sound-section-content",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
    })
    .to('.sound-section .content', {
        opacity: 1,
        scrollTrigger: {
            trigger: ".sound-section-content",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
    })
    .to(position, {
        x: !isMobile ? 1 : 9.36,
        y: !isMobile ? 13 : 10.95,
        z: !isMobile ? 0 : 0.09,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
        onUpdate
    })
    .to(target, {
        x: !isMobile ? -0.55 : -1.6,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : 0.06,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
        onUpdate
    })
    .to('.display-section', {
        opacity: 1,
        scrollTrigger: {
            trigger: ".display-section",
            start: "top bottom",
            end: "top top",
            scrub: 0,
            immediateRender: false
        },
    })
}