
import React from 'react';
import type { Category } from './types';

// Physics Icons
const MotionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ThermalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const WavesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.938 6.126a9 9 0 1111.963 0M10 3.055v.01" />
    </svg>
);

const ElectricityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const NuclearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 2c-5.621 0-10.203 4.582-10.203 10.203S7.879 22.406 13.5 22.406c5.621 0 10.203-4.582 10.203-10.203S19.121 2 13.5 2z" />
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 12.203c-2.344 0-4.252-1.907-4.252-4.251S11.156 3.7 13.5 3.7c2.344 0 4.252 1.907 4.252 4.252s-1.908 4.251-4.252 4.251z" />
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 12.203c-2.344 0-4.252 1.907-4.252 4.252s1.908 4.251 4.252 4.251 4.252-1.907 4.252-4.251-1.908-4.252-4.252-4.252zM12.203 13.5c0-2.344 1.907-4.252 4.251-4.252s4.251 1.908 4.251 4.252-1.907 4.252-4.251 4.252-4.251-1.908-4.251-4.252zM12.203 13.5c0-2.344-1.907-4.252-4.252-4.252S3.7 11.156 3.7 13.5c0 2.344 1.907 4.252 4.252 4.252s4.251-1.908 4.251-4.252z" />
    </svg>
);

const SpaceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
    </svg>
);

// Biology Icons
const CellularIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
);

const PhysiologyIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c2.236 1.12 4.472-1.12 6.708-2.24C17.944 6.64 19 6 19 6c1.06 1.06.94 3.32-.23 5.48-1.17 2.16-3.41 3.32-5.12 3.32-1.71 0-2.88-1.16-2.88-2.32 0-1.16.8-2.32 1.6-2.32.8 0 1.6.8 1.6 1.6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 14.828a4 4 0 005.656 0M9 10s-2 2-2 4" />
    </svg>
);

const HumanHealthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const GeneticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 10-7.07 0M19.07 12.93a7 7 0 00-9.9 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.465 15.536a5 5 0 107.07 0M12.93 19.07a7 7 0 009.9 0" />
    </svg>
);

const EcologyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 22a10 10 0 110-20 10 10 0 010 20z" />
    </svg>
);

// Chemistry Icons
const AtomIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="9" ry="4" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </svg>
);
const ReactionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806zM14.572 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L1.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" clipRule="evenodd" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0111.48-2.52" />
    </svg>
);
const PeriodicTableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <path d="M15 13h2" />
        <path d="M15 17h4" />
        <path d="M14 3v6" />
        <path d="M12 15h.01" />
    </svg>
);
const OrganicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ExperimentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.572 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L1.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" clipRule="evenodd" />
    </svg>
);


export const PHYSICS_CATEGORIES: Category[] = [
    {
        name: 'Motion, forces and energy',
        icon: <MotionIcon />,
        topics: [
            {
                name: 'Physical quantities and measurement techniques',
                indicators: [
                    { name: 'Describe the use of rulers and measuring cylinders to find a length or a volume' },
                    { name: 'Describe how to measure a variety of time intervals using clocks and digital timers' },
                    { name: 'Determine an average value for a small distance and for a short interval of time by measuring multiples (including the period of oscillation of a pendulum)' },
                    { name: 'Understand that a scalar quantity has magnitude (size) only and that a vector quantity has magnitude and direction', isSupplement: true },
                    { name: 'Know that the following quantities are scalars: distance, speed, time, mass, energy and temperature', isSupplement: true },
                    { name: 'Know that the following quantities are vectors: force, weight, velocity, acceleration, momentum, electric field strength and gravitational field strength', isSupplement: true },
                    { name: 'Determine, by calculation or graphically, the resultant of two vectors at right angles, limited to forces or velocities only', isSupplement: true }
                ]
            },
            {
                name: 'Motion',
                indicators: [
                    { name: 'Define speed as distance travelled per unit time; recall and use the equation v = s/t' },
                    { name: 'Define velocity as speed in a given direction' },
                    { name: 'Recall and use the equation average speed = total distance travelled / total time taken' },
                    { name: 'Sketch, plot and interpret distance-time and speed-time graphs' },
                    { name: 'Determine, qualitatively, from given data or the shape of a distance-time graph or speed-time graph when an object is: (a) at rest (b) moving with constant speed (c) accelerating (d) decelerating' },
                    { name: 'Calculate speed from the gradient of a straight-line section of a distance-time graph' },
                    { name: 'Calculate the area under a speed-time graph to determine the distance travelled for motion with constant speed or constant acceleration' },
                    { name: 'State that the acceleration of free fall g for an object near to the surface of the Earth is approximately constant and is approximately 9.8m/s²' },
                    { name: 'Define acceleration as change in velocity per unit time; recall and use the equation a = Δv/Δt', isSupplement: true },
                    { name: 'Determine from given data or the shape of a speed-time graph when an object is moving with: (a) constant acceleration (b) changing acceleration', isSupplement: true },
                    { name: 'Calculate acceleration from the gradient of a speed-time graph', isSupplement: true },
                    { name: 'Know that a deceleration is a negative acceleration and use this in calculations', isSupplement: true },
                    { name: 'Describe the motion of objects falling in a uniform gravitational field with and without air/liquid resistance, including reference to terminal velocity', isSupplement: true }
                ]
            },
            {
                name: 'Mass and weight',
                indicators: [
                    { name: 'State that mass is a measure of the quantity of matter in an object at rest relative to the observer' },
                    { name: 'State that weight is a gravitational force on an object that has mass' },
                    { name: 'Define gravitational field strength as force per unit mass; recall and use the equation g = W/m and know that this is equivalent to the acceleration of free fall' },
                    { name: 'Know that weights (and masses) may be compared using a balance' },
                    { name: 'Describe, and use the concept of, weight as the effect of a gravitational field on a mass', isSupplement: true }
                ]
            },
            {
                name: 'Density',
                indicators: [
                    { name: 'Define density as mass per unit volume; recall and use the equation ρ = m/V' },
                    { name: 'Describe how to determine the density of a liquid, of a regularly shaped solid and of an irregularly shaped solid which sinks in a liquid (volume by displacement), including appropriate calculations' },
                    { name: 'Determine whether an object floats based on density data' },
                    { name: 'Determine whether one liquid will float on another liquid based on density data given that the liquids do not mix', isSupplement: true }
                ]
            },
            {
                name: 'Forces',
                subTopics: [
                    {
                        name: 'Effects of forces',
                        indicators: [
                            { name: 'Know that forces may produce changes in the size and shape of an object' },
                            { name: 'Sketch, plot and interpret load-extension graphs for an elastic solid and describe the associated experimental procedures' },
                            { name: 'Determine the resultant of two or more forces acting along the same straight line' },
                            { name: 'Know that an object either remains at rest or continues in a straight line at constant speed unless acted on by a resultant force' },
                            { name: 'State that a resultant force may change the velocity of an object by changing its direction of motion or its speed' },
                            { name: 'Describe solid friction as the force between two surfaces that may impede motion and produce heating' },
                            { name: 'Know that friction (drag) acts on an object moving through a liquid' },
                            { name: 'Know that friction (drag) acts on an object moving through a gas (e.g. air resistance)' },
                            { name: 'Define the spring constant as force per unit extension; recall and use the equation k = F/x', isSupplement: true },
                            { name: "Define and use the term 'limit of proportionality' for a load-extension graph and identify this point on the graph (an understanding of the elastic limit is not required)", isSupplement: true },
                            { name: 'Recall and use the equation F = ma and know that the force and the acceleration are in the same direction', isSupplement: true },
                            { name: 'Describe, qualitatively, motion in a circular path due to a force perpendicular to the motion as: (a) speed increases if force increases, with mass and radius constant (b) radius decreases if force increases, with mass and speed constant (c) an increased mass requires an increased force to keep speed and radius constant', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Turning effect of forces',
                        indicators: [
                            { name: 'Describe the moment of a force as a measure of its turning effect and give everyday examples' },
                            { name: 'Define the moment of a force as moment = force × perpendicular distance from the pivot; recall and use this equation' },
                            { name: 'Apply the principle of moments to situations with one force each side of the pivot, including balancing of a beam' },
                            { name: 'State that, when there is no resultant force and no resultant moment, an object is in equilibrium' },
                            { name: 'Apply the principle of moments to other situations, including those with more than one force each side of the pivot', isSupplement: true },
                            { name: 'Describe an experiment to demonstrate that there is no resultant moment on an object in equilibrium', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Centre of gravity',
                        indicators: [
                            { name: 'State what is meant by centre of gravity' },
                            { name: 'Describe an experiment to determine the position of the centre of gravity of an irregularly shaped plane lamina' },
                            { name: 'Describe, qualitatively, the effect of the position of the centre of gravity on the stability of simple objects' }
                        ]
                    }
                ]
            },
            {
                name: 'Momentum',
                isSupplement: true,
                indicators: [
                    { name: 'Define momentum as mass × velocity; recall and use the equation p = mv', isSupplement: true },
                    { name: 'Define impulse as force × time for which force acts; recall and use the equation impulse = FΔt = Δ(mv)', isSupplement: true },
                    { name: 'Apply the principle of the conservation of momentum to solve simple problems in one dimension', isSupplement: true },
                    { name: 'Define resultant force as the change in momentum per unit time; recall and use the equation F = Δp/Δt', isSupplement: true }
                ]
            },
            {
                name: 'Energy, work and power',
                subTopics: [
                    {
                        name: 'Energy',
                        indicators: [
                            { name: 'State that energy may be stored as kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic and internal (thermal)' },
                            { name: 'Describe how energy is transferred between stores during events and processes, including examples of transfer by forces (mechanical work done), electrical currents (electrical work done), heating, and by electromagnetic, sound and other waves' },
                            { name: 'Know the principle of the conservation of energy and apply this principle to simple examples including the interpretation of simple flow diagrams' },
                            { name: 'Recall and use the equation for kinetic energy Ek = ½mv²', isSupplement: true },
                            { name: 'Recall and use the equation for the change in gravitational potential energy ΔEp = mgΔh', isSupplement: true },
                            { name: 'Know the principle of the conservation of energy and apply this principle to complex examples involving multiple stages, including the interpretation of Sankey diagrams', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Work',
                        indicators: [
                            { name: 'Understand that mechanical or electrical work done is equal to the energy transferred' },
                            { name: 'Recall and use the equation for mechanical working W = Fd = ΔE' }
                        ]
                    },
                    {
                        name: 'Energy resources',
                        indicators: [
                            { name: 'Describe how useful energy may be obtained, or electrical power generated, from: (a) chemical energy stored in fossil fuels (b) chemical energy stored in biofuels (c) water, including the energy stored in waves, in tides and in water behind hydroelectric dams (d) geothermal resources (e) nuclear fuel (f) light from the Sun to generate electrical power (solar cells) (g) infrared and other electromagnetic waves from the Sun to heat water (solar panels) and be the source of wind energy including references to a boiler, turbine and generator where they are used' },
                            { name: 'Describe advantages and disadvantages of each method in terms of renewability, availability, reliability, scale and environmental impact' },
                            { name: 'Understand, qualitatively, the concept of efficiency of energy transfer' },
                            { name: 'Know that radiation from the Sun is the main source of energy for all our energy resources except geothermal, nuclear and tidal', isSupplement: true },
                            { name: 'Know that energy is released by nuclear fusion in the Sun', isSupplement: true },
                            { name: 'Know that research is being carried out to investigate how energy released by nuclear fusion can be used to produce electrical energy on a large scale', isSupplement: true },
                            { name: 'Define efficiency as: (a) (%) efficiency = (useful energy output / total energy input) × 100% (b) (%) efficiency = (useful power output / total power input) × 100%; recall and use these equations', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Power',
                        indicators: [
                            { name: 'Define power as work done per unit time and also as energy transferred per unit time; recall and use the equations (a) P = W/t (b) P = ΔE/t' }
                        ]
                    }
                ]
            },
            {
                name: 'Pressure',
                indicators: [
                    { name: 'Define pressure as force per unit area; recall and use the equation p = F/A' },
                    { name: 'Describe how pressure varies with force and area in the context of everyday examples' },
                    { name: 'Describe, qualitatively, how the pressure beneath the surface of a liquid changes with depth and density of the liquid' },
                    { name: 'Recall and use the equation for the change in pressure beneath the surface of a liquid Δp = ρgΔh', isSupplement: true }
                ]
            }
        ]
    },
    {
        name: 'Thermal physics',
        icon: <ThermalIcon />,
        topics: [
            {
                name: 'Kinetic particle model of matter',
                subTopics: [
                    {
                        name: 'States of matter',
                        indicators: [
                            { name: 'Know the distinguishing properties of solids, liquids and gases' },
                            { name: 'Know the terms for the changes in state between solids, liquids and gases (gas to solid and solid to gas transfers are not required)' }
                        ]
                    },
                    {
                        name: 'Particle model',
                        indicators: [
                            { name: 'Describe the particle structure of solids, liquids and gases in terms of the arrangement, separation and motion of the particles and represent these states using simple particle diagrams' },
                            { name: 'Describe the relationship between the motion of particles and temperature, including the idea that there is a lowest possible temperature (–273 °C), known as absolute zero, where the particles have least kinetic energy' },
                            { name: 'Describe the pressure and the changes in pressure of a gas in terms of the motion of its particles and their collisions with a surface' },
                            { name: 'Know that the random motion of microscopic particles in a suspension is evidence for the kinetic particle model of matter' },
                            { name: 'Describe and explain this motion (sometimes known as Brownian motion) in terms of random collisions between the microscopic particles in a suspension and the particles of the gas or liquid' },
                            { name: 'Know that the forces and distances between particles (atoms, molecules, ions and electrons) and the motion of the particles affects the properties of solids, liquids and gases', isSupplement: true },
                            { name: 'Describe the pressure and the changes in pressure of a gas in terms of the forces exerted by particles colliding with surfaces, creating a force per unit area', isSupplement: true },
                            { name: 'Know that microscopic particles may be moved by collisions with light fast-moving molecules and correctly use the terms atoms or molecules as distinct from microscopic particles', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Gases and the absolute scale of temperature',
                        indicators: [
                            { name: 'Describe qualitatively, in terms of particles, the effect on the pressure of a fixed mass of gas of: (a) a change of temperature at constant volume (b) a change of volume at constant temperature' },
                            { name: 'Convert temperatures between kelvin and degrees Celsius; recall and use the equation T (in K) = θ (in °C) + 273' },
                            { name: 'Recall and use the equation pV = constant for a fixed mass of gas at constant temperature, including a graphical representation of this relationship', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Thermal properties and temperature',
                subTopics: [
                    {
                        name: 'Thermal expansion of solids, liquids and gases',
                        indicators: [
                            { name: 'Describe, qualitatively, the thermal expansion of solids, liquids and gases at constant pressure' },
                            { name: 'Describe some of the everyday applications and consequences of thermal expansion' },
                            { name: 'Explain, in terms of the motion and arrangement of particles, the relative order of magnitudes of the expansion of solids, liquids and gases as their temperatures rise', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Specific heat capacity',
                        indicators: [
                            { name: 'Know that a rise in the temperature of an object increases its internal energy' },
                            { name: 'Describe an increase in temperature of an object in terms of an increase in the average kinetic energies of all of the particles in the object', isSupplement: true },
                            { name: 'Define specific heat capacity as the energy required per unit mass per unit temperature increase; recall and use the equation c = ΔE / (mΔθ)', isSupplement: true },
                            { name: 'Describe experiments to measure the specific heat capacity of a solid and a liquid', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Melting, boiling and evaporation',
                        indicators: [
                            { name: 'Describe melting and boiling in terms of energy input without a change in temperature' },
                            { name: 'Know the melting and boiling temperatures for water at standard atmospheric pressure' },
                            { name: 'Describe condensation and solidification in terms of particles' },
                            { name: 'Describe evaporation in terms of the escape of more-energetic particles from the surface of a liquid' },
                            { name: 'Know that evaporation causes cooling of a liquid' },
                            { name: 'Describe the differences between boiling and evaporation', isSupplement: true },
                            { name: 'Describe how temperature, surface area and air movement over a surface affect evaporation', isSupplement: true },
                            { name: 'Explain the cooling of an object in contact with an evaporating liquid', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Transfer of thermal energy',
                subTopics: [
                    {
                        name: 'Conduction',
                        indicators: [
                            { name: 'Describe experiments to demonstrate the properties of good thermal conductors and bad thermal conductors (thermal insulators)' },
                            { name: 'Describe thermal conduction in all solids in terms of atomic or molecular lattice vibrations and also in terms of the movement of free (delocalised) electrons in metallic conductors', isSupplement: true },
                            { name: 'Describe, in terms of particles, why thermal conduction is bad in gases and most liquids', isSupplement: true },
                            { name: 'Know that there are many solids that conduct thermal energy better than thermal insulators but do so less well than good thermal conductors', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Convection',
                        indicators: [
                            { name: 'Know that convection is an important method of thermal energy transfer in liquids and gases' },
                            { name: 'Explain convection in liquids and gases in terms of density changes and describe experiments to illustrate convection' }
                        ]
                    },
                    {
                        name: 'Radiation',
                        indicators: [
                            { name: 'Know that thermal radiation is infrared radiation and that all objects emit this radiation' },
                            { name: 'Know that thermal energy transfer by thermal radiation does not require a medium' },
                            { name: 'Describe the effect of surface colour (black or white) and texture (dull or shiny) on the emission, absorption and reflection of infrared radiation' },
                            { name: 'Know that for an object to be at a constant temperature it needs to transfer energy away from the object at the same rate that it receives energy', isSupplement: true },
                            { name: 'Know what happens to an object if the rate at which it receives energy is less or more than the rate at which it transfers energy away from the object', isSupplement: true },
                            { name: 'Know how the temperature of the Earth is affected by factors controlling the balance between incoming radiation and radiation emitted from the Earth’s surface', isSupplement: true },
                            { name: 'Describe experiments to distinguish between good and bad emitters of infrared radiation', isSupplement: true },
                            { name: 'Describe experiments to distinguish between good and bad absorbers of infrared radiation', isSupplement: true },
                            { name: 'Describe how the rate of emission of radiation depends on the surface temperature and surface area of an object', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Consequences of thermal energy transfer',
                        indicators: [
                            { name: 'Explain some of the basic everyday applications and consequences of conduction, convection and radiation, including: (a) heating objects such as kitchen pans (b) heating a room by convection' },
                            { name: 'Explain some of the complex applications and consequences of conduction, convection and radiation where more than one type of thermal energy transfer is significant, including: (a) a fire burning wood or coal (b) a radiator in a car', isSupplement: true }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Waves',
        icon: <WavesIcon />,
        topics: [
            {
                name: 'General properties of waves',
                indicators: [
                    { name: 'Know that waves transfer energy without transferring matter' },
                    { name: 'Describe what is meant by wave motion as illustrated by vibrations in ropes and springs, and by experiments using water waves' },
                    { name: 'Describe the features of a wave in terms of wavefront, wavelength, frequency, crest (peak), trough, amplitude and wave speed' },
                    { name: 'Recall and use the equation for wave speed v = fλ' },
                    { name: 'Know that for a transverse wave, the direction of vibration is at right angles to the direction of propagation and understand that electromagnetic radiation, water waves and seismic S-waves (secondary) can be modelled as transverse' },
                    { name: 'Know that for a longitudinal wave, the direction of vibration is parallel to the direction of propagation and understand that sound waves and seismic P-waves (primary) can be modelled as longitudinal' },
                    { name: 'Describe how waves can undergo: (a) reflection at a plane surface (b) refraction due to a change of speed (c) diffraction through a narrow gap' },
                    { name: 'Describe the use of a ripple tank to show: (a) reflection at a plane surface (b) refraction due to a change in speed caused by a change in depth (c) diffraction due to a gap (d) diffraction due to an edge' },
                    { name: 'Describe how wavelength and gap size affects diffraction through a gap', isSupplement: true },
                    { name: 'Describe how wavelength affects diffraction at an edge', isSupplement: true }
                ]
            },
            {
                name: 'Light',
                subTopics: [
                    {
                        name: 'Reflection of light',
                        indicators: [
                            { name: 'Define and use the terms normal, angle of incidence and angle of reflection' },
                            { name: 'Describe the formation of an optical image by a plane mirror and give its characteristics, i.e. same size, same distance from mirror, virtual' },
                            { name: 'State that for reflection, the angle of incidence is equal to the angle of reflection; recall and use this relationship' },
                            { name: 'Use simple constructions, measurements and calculations for reflection by plane mirrors', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Refraction of light',
                        indicators: [
                            { name: 'Define and use the terms normal, angle of incidence and angle of refraction' },
                            { name: 'Describe an experiment to show refraction of light by transparent blocks of different shapes' },
                            { name: 'Describe the passage of light through a transparent material (limited to the boundaries between two mediums only)' },
                            { name: 'State the meaning of critical angle' },
                            { name: 'Describe internal reflection and total internal reflection using both experimental and everyday examples' },
                            { name: 'Define refractive index, n, as the ratio of the speeds of a wave in two different regions', isSupplement: true },
                            { name: 'Recall and use the equation n = sin i / sin r', isSupplement: true },
                            { name: 'Recall and use the equation n = 1 / sin c', isSupplement: true },
                            { name: 'Describe the use of optical fibres, particularly in telecommunications', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Thin lenses',
                        indicators: [
                            { name: 'Describe the action of thin converging and thin diverging lenses on a parallel beam of light' },
                            { name: 'Define and use the terms focal length, principal axis and principal focus (focal point)' },
                            { name: 'Draw and use ray diagrams for the formation of a real image by a converging lens' },
                            { name: 'Describe the characteristics of an image using the terms enlarged/same size/diminished, upright/inverted and real/virtual' },
                            { name: 'Know that a virtual image is formed when diverging rays are extrapolated backwards and does not form a visible projection on a screen' },
                            { name: 'Draw and use ray diagrams for the formation of a virtual image by a converging lens', isSupplement: true },
                            { name: 'Describe the use of a single lens as a magnifying glass', isSupplement: true },
                            { name: 'Describe the use of converging and diverging lenses to correct long-sightedness and short-sightedness', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Dispersion of light',
                        indicators: [
                            { name: 'Describe the dispersion of light as illustrated by the refraction of white light by a glass prism' },
                            { name: 'Know the traditional seven colours of the visible spectrum in order of frequency and in order of wavelength' },
                            { name: 'Recall that visible light of a single frequency is described as monochromatic', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Electromagnetic spectrum',
                indicators: [
                    { name: 'Know the main regions of the electromagnetic spectrum in order of frequency and in order of wavelength' },
                    { name: 'Know that all electromagnetic waves travel at the same high speed in a vacuum' },
                    { name: 'Describe typical uses of the different regions of the electromagnetic spectrum including: (a) radio waves (b) microwaves (c) infrared (d) visible light (e) ultraviolet (f) X-rays (g) gamma rays' },
                    { name: 'Describe the harmful effects on people of excessive exposure to electromagnetic radiation, including: (a) microwaves (b) infrared (c) ultraviolet (d) X-rays and gamma rays' },
                    { name: 'Know that communication with artificial satellites is mainly by microwaves' },
                    { name: 'Know that the speed of electromagnetic waves in a vacuum is 3.0 × 10⁸ m/s and is approximately the same in air', isSupplement: true },
                    { name: 'Know that many important systems of communications rely on electromagnetic radiation including: (a) mobile phones (cell phones) and wireless internet (b) Bluetooth (c) optical fibres', isSupplement: true },
                    { name: 'Know the difference between a digital and analogue signal', isSupplement: true },
                    { name: 'Know that a sound can be transmitted as a digital or analogue signal', isSupplement: true },
                    { name: 'Explain the benefits of digital signalling including increased rate of transmission of data and increased range due to accurate signal regeneration', isSupplement: true }
                ]
            },
            {
                name: 'Sound',
                indicators: [
                    { name: 'Describe the production of sound by vibrating sources' },
                    { name: 'Describe the longitudinal nature of sound waves' },
                    { name: 'State the approximate range of frequencies audible to humans as 20 Hz to 20 000 Hz' },
                    { name: 'Know that a medium is needed to transmit sound waves' },
                    { name: 'Know that the speed of sound in air is approximately 330–350 m/s' },
                    { name: 'Describe a method involving a measurement of distance and time for determining the speed of sound in air' },
                    { name: 'Describe how changes in amplitude and frequency affect the loudness and pitch of sound waves' },
                    { name: 'Describe an echo as the reflection of sound waves' },
                    { name: 'Define ultrasound as sound with a frequency higher than 20 kHz' },
                    { name: 'Describe compression and rarefaction', isSupplement: true },
                    { name: 'Know that, in general, sound travels faster in solids than in liquids and faster in liquids than in gases', isSupplement: true },
                    { name: 'Describe the uses of ultrasound in non-destructive testing of materials, medical scanning of soft tissue and sonar including calculation of depth or distance from time and wave speed', isSupplement: true }
                ]
            }
        ]
    },
    {
        name: 'Electricity and magnetism',
        icon: <ElectricityIcon />,
        topics: [
            {
                name: 'Simple phenomena of magnetism',
                indicators: [
                    { name: 'Describe the forces between magnetic poles and between magnets and magnetic materials, including the use of the terms north pole (N pole), south pole (S pole), attraction and repulsion, magnetised and unmagnetised' },
                    { name: 'Describe induced magnetism' },
                    { name: 'State the differences between the properties of temporary magnets (made of soft iron) and the properties of permanent magnets (made of steel)' },
                    { name: 'State the difference between magnetic and non-magnetic materials' },
                    { name: 'Describe a magnetic field as a region in which a magnetic pole experiences a force' },
                    { name: 'Draw the pattern and direction of magnetic field lines around a bar magnet' },
                    { name: 'State that the direction of a magnetic field at a point is the direction of the force on the N pole of a magnet at that point' },
                    { name: 'Describe the plotting of magnetic field lines with a compass or iron filings and the use of a compass to determine the direction of the magnetic field' },
                    { name: 'Describe the uses of permanent magnets and electromagnets' },
                    { name: 'Explain that magnetic forces are due to interactions between magnetic fields', isSupplement: true },
                    { name: 'Know that the relative strength of a magnetic field is represented by the spacing of the magnetic field lines', isSupplement: true }
                ]
            },
            {
                name: 'Electrical quantities',
                subTopics: [
                    {
                        name: 'Electric charge',
                        indicators: [
                            { name: 'State that there are positive and negative charges' },
                            { name: 'State that positive charges repel other positive charges, negative charges repel other negative charges, but positive charges attract negative charges' },
                            { name: 'Describe simple experiments to show the production of electrostatic charges by friction and to show the detection of electrostatic charges' },
                            { name: 'Explain that charging of solids by friction involves only a transfer of negative charge (electrons)' },
                            { name: 'Describe an experiment to distinguish between electrical conductors and insulators' },
                            { name: 'Recall and use a simple electron model to explain the difference between electrical conductors and insulators and give typical examples' },
                            { name: 'State that charge is measured in coulombs', isSupplement: true },
                            { name: 'Describe an electric field as a region in which an electric charge experiences a force', isSupplement: true },
                            { name: 'State that the direction of an electric field at a point is the direction of the force on a positive charge at that point', isSupplement: true },
                            { name: 'Describe simple electric field patterns, including the direction of the field: (a) around a point charge (b) around a charged conducting sphere (c) between two oppositely charged parallel conducting plates (end effects will not be examined)', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Electric current',
                        indicators: [
                            { name: 'Know that electric current is related to the flow of charge' },
                            { name: 'Describe the use of ammeters (analogue and digital) with different ranges' },
                            { name: 'Describe electrical conduction in metals in terms of the movement of free electrons' },
                            { name: 'Know the difference between direct current (d.c.) and alternating current (a.c.)' },
                            { name: 'Define electric current as the charge passing a point per unit time; recall and use the equation I = Q/t', isSupplement: true },
                            { name: 'State that conventional current is from positive to negative and that the flow of free electrons is from negative to positive', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Electromotive force and potential difference',
                        indicators: [
                            { name: 'Define electromotive force (e.m.f.) as the electrical work done by a source in moving a unit charge around a complete circuit' },
                            { name: 'Know that e.m.f. is measured in volts (V)' },
                            { name: 'Define potential difference (p.d.) as the work done by a unit charge passing through a component' },
                            { name: 'Know that the p.d. between two points is measured in volts (V)' },
                            { name: 'Describe the use of voltmeters (analogue and digital) with different ranges' },
                            { name: 'Recall and use the equation for e.m.f. E = W/Q', isSupplement: true },
                            { name: 'Recall and use the equation for p.d. V = W/Q', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Resistance',
                        indicators: [
                            { name: 'Recall and use the equation for resistance R = V/I' },
                            { name: 'Describe an experiment to determine resistance using a voltmeter and an ammeter and do the appropriate calculations' },
                            { name: 'State, qualitatively, the relationship of the resistance of a metallic wire to its length and to its cross-sectional area' },
                            { name: 'Sketch and explain the current-voltage graphs for a resistor of constant resistance, a filament lamp and a diode', isSupplement: true },
                            { name: 'Recall and use the following relationship for a metallic electrical conductor: (a) resistance is directly proportional to length (b) resistance is inversely proportional to cross-sectional area', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Electrical energy and electrical power',
                        indicators: [
                            { name: 'Understand that electric circuits transfer energy from a source of electrical energy, such as an electrical cell or mains supply, to the circuit components and then into the surroundings' },
                            { name: 'Recall and use the equation for electrical power P = IV' },
                            { name: 'Recall and use the equation for electrical energy E = IVt' },
                            { name: 'Define the kilowatt-hour (kWh) and calculate the cost of using electrical appliances where the energy unit is the kWh' }
                        ]
                    }
                ]
            },
            {
                name: 'Electric circuits',
                subTopics: [
                    {
                        name: 'Circuit diagrams and circuit components',
                        indicators: [
                            { name: 'Draw and interpret circuit diagrams containing cells, batteries, power supplies, generators, potential dividers, switches, resistors (fixed and variable), heaters, thermistors (NTC only), light-dependent resistors (LDRs), lamps, motors, bells, ammeters, voltmeters, magnetising coils, transformers, fuses and relays and know how these components behave in the circuit' },
                            { name: 'Draw and interpret circuit diagrams containing diodes and light-emitting diodes (LEDs) and know how these components behave in the circuit', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Series and parallel circuits',
                        indicators: [
                            { name: 'Know that the current at every point in a series circuit is the same' },
                            { name: 'Know how to construct and use series and parallel circuits' },
                            { name: 'Calculate the combined e.m.f. of several sources in series' },
                            { name: 'Calculate the combined resistance of two or more resistors in series' },
                            { name: 'State that, for a parallel circuit, the current from the source is larger than the current in each branch' },
                            { name: 'State that the combined resistance of two resistors in parallel is less than that of either resistor by itself' },
                            { name: 'State the advantages of connecting lamps in parallel in a lighting circuit' },
                            { name: 'Recall and use in calculations, the fact that: (a) the sum of the currents entering a junction in a parallel circuit is equal to the sum of the currents that leave the junction (b) the total p.d. across the components in a series circuit is equal to the sum of the individual p.d.s across each component (c) the p.d. across an arrangement of parallel resistances is the same as the p.d. across one branch in the arrangement of the parallel resistances', isSupplement: true },
                            { name: 'Explain that the sum of the currents into a junction is the same as the sum of the currents out of the junction', isSupplement: true },
                            { name: 'Calculate the combined resistance of two resistors in parallel', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Action and use of circuit components',
                        indicators: [
                            { name: 'Know that the p.d. across an electrical conductor increases as its resistance increases for a constant current' },
                            { name: 'Describe the action of a variable potential divider', isSupplement: true },
                            { name: 'Recall and use the equation for two resistors used as a potential divider R₁/R₂ = V₁/V₂', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Electrical safety',
                indicators: [
                    { name: 'State the hazards of: (a) damaged insulation (b) overheating cables (c) damp conditions (d) excess current from overloading of plugs, extension leads, single and multiple sockets when using a mains supply' },
                    { name: 'Know that a mains circuit consists of a live wire (line wire), a neutral wire and an earth wire and explain why a switch must be connected to the live wire for the circuit to be switched off safely' },
                    { name: 'Explain the use and operation of trip switches and fuses and choose appropriate fuse ratings and trip switch settings' },
                    { name: 'Explain why the outer casing of an electrical appliance must be either non-conducting (double-insulated) or earthed' },
                    { name: 'State that a fuse without an earth wire protects the circuit and the cabling for a double-insulated appliance' }
                ]
            },
            {
                name: 'Electromagnetic effects',
                subTopics: [
                    {
                        name: 'Electromagnetic induction',
                        indicators: [
                            { name: 'Know that a conductor moving across a magnetic field or a changing magnetic field linking with a conductor can induce an e.m.f. in the conductor' },
                            { name: 'Describe an experiment to demonstrate electromagnetic induction' },
                            { name: 'State the factors affecting the magnitude of an induced e.m.f.' },
                            { name: 'Know that the direction of an induced e.m.f. opposes the change causing it', isSupplement: true },
                            { name: 'State and use the relative directions of force, field and induced current', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The a.c. generator',
                        isSupplement: true,
                        indicators: [
                            { name: 'Describe a simple form of a.c. generator (rotating coil or rotating magnet) and the use of slip rings and brushes where needed', isSupplement: true },
                            { name: 'Sketch and interpret graphs of e.m.f. against time for simple a.c. generators and relate the position of the generator coil to the peaks, troughs and zeros of the e.m.f.', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Magnetic effect of a current',
                        indicators: [
                            { name: 'Describe the pattern and direction of the magnetic field due to currents in straight wires and in solenoids' },
                            { name: 'Describe an experiment to identify the pattern of the magnetic field (including direction) due to currents in straight wires and in solenoids' },
                            { name: 'Describe how the magnetic effect of a current is used in relays and loudspeakers and give examples of their application' },
                            { name: 'State the qualitative variation of the strength of the magnetic field around straight wires and solenoids', isSupplement: true },
                            { name: 'Describe the effect on the magnetic field around straight wires and solenoids of changing the magnitude and direction of the current', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Force on a current-carrying conductor',
                        indicators: [
                            { name: 'Describe an experiment to show that a force acts on a current-carrying conductor in a magnetic field, including the effect of reversing: (a) the current (b) the direction of the field' },
                            { name: 'Recall and use the relative directions of force, magnetic field and current', isSupplement: true },
                            { name: 'Determine the direction of the force on beams of charged particles in a magnetic field', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The d.c. motor',
                        indicators: [
                            { name: 'Know that a current-carrying coil in a magnetic field may experience a turning effect and that the turning effect is increased by increasing: (a) the number of turns on the coil (b) the current (c) the strength of the magnetic field' },
                            { name: 'Describe the operation of an electric motor, including the action of a split-ring commutator and brushes', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The transformer',
                        indicators: [
                            { name: 'Describe the construction of a simple transformer with a soft-iron core, as used for voltage transformations' },
                            { name: 'Use the terms primary, secondary, step-up and step-down' },
                            { name: 'Recall and use the equation Vp/Vs = Np/Ns' },
                            { name: 'Describe the use of transformers in high-voltage transmission of electricity' },
                            { name: 'State the advantages of high-voltage transmission' },
                            { name: 'Explain the principle of operation of a simple iron-cored transformer', isSupplement: true },
                            { name: 'Recall and use the equation for 100% efficiency in a transformer IpVp = IsVs', isSupplement: true },
                            { name: 'Recall and use the equation P = I²R to explain why power losses in cables are smaller when the voltage is greater', isSupplement: true }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Nuclear physics',
        icon: <NuclearIcon />,
        topics: [
            {
                name: 'The nuclear model of the atom',
                subTopics: [
                    {
                        name: 'The atom',
                        indicators: [
                            { name: 'Describe the structure of an atom in terms of a positively charged nucleus and negatively charged electrons in orbit around the nucleus' },
                            { name: 'Know how atoms may form positive ions by losing electrons or form negative ions by gaining electrons' },
                            { name: 'Describe how the scattering of alpha (α) particles by a sheet of thin metal supports the nuclear model of the atom, by providing evidence for: (a) a very small nucleus surrounded by mostly empty space (b) a nucleus containing most of the mass of the atom (c) a nucleus that is positively charged', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The nucleus',
                        indicators: [
                            { name: 'Describe the composition of the nucleus in terms of protons and neutrons' },
                            { name: 'State the relative charges of protons, neutrons and electrons as +1, 0 and –1 respectively' },
                            { name: 'Define the terms proton number (atomic number) Z and nucleon number (mass number) A and be able to calculate the number of neutrons in a nucleus' },
                            { name: 'Use the nuclide notation AX' },
                            { name: 'Explain what is meant by an isotope and state that an element may have more than one isotope' },
                            { name: 'Describe the processes of nuclear fission and nuclear fusion as the splitting or joining of nuclei, to include the nuclide equation and qualitative description of mass and energy changes without values', isSupplement: true },
                            { name: 'Know the relationship between the proton number and the relative charge on a nucleus', isSupplement: true },
                            { name: 'Know the relationship between the nucleon number and the relative mass of a nucleus', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Radioactivity',
                subTopics: [
                    {
                        name: 'Detection of radioactivity',
                        indicators: [
                            { name: 'Know what is meant by background radiation' },
                            { name: 'Know the sources that make a significant contribution to background radiation including: (a) radon gas (in the air) (b) rocks and buildings (c) food and drink (d) cosmic rays' },
                            { name: 'Know that ionising nuclear radiation can be measured using a detector connected to a counter' },
                            { name: 'Use count rate measured in counts/s or counts/minute' },
                            { name: 'Use measurements of background radiation to determine a corrected count rate', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The three types of nuclear emission',
                        indicators: [
                            { name: 'Describe the emission of radiation from a nucleus as spontaneous and random in direction' },
                            { name: 'Identify alpha (α), beta (β) and gamma (γ) emissions from the nucleus by recalling: (a) their nature (b) their relative ionising effects (c) their relative penetrating abilities' },
                            { name: 'Describe the deflection of α-particles, β-particles and γ-radiation in electric fields and magnetic fields', isSupplement: true },
                            { name: 'Explain their relative ionising effects with reference to: (a) kinetic energy (b) electric charge', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Radioactive decay',
                        indicators: [
                            { name: 'Know that radioactive decay is a change in an unstable nucleus that can result in the emission of α-particles or β-particles and/or γ-radiation and know that these changes are spontaneous and random' },
                            { name: 'State that during α-decay or β-decay, the nucleus changes to that of a different element' },
                            { name: 'Know that isotopes of an element may be radioactive due to an excess of neutrons in the nucleus and/or the nucleus being too heavy', isSupplement: true },
                            { name: 'Describe the effect of α-decay, β-decay and γ-emissions on the nucleus, including an increase in stability and a reduction in the number of excess neutrons; the following change in the nucleus occurs during β-emission: neutron → proton + electron', isSupplement: true },
                            { name: 'Use decay equations, using nuclide notation, to show the emission of α-particles, β-particles and γ-radiation', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Half-life',
                        indicators: [
                            { name: 'Define the half-life of a particular isotope as the time taken for half the nuclei of that isotope in any sample to decay; recall and use this definition in simple calculations, which might involve information in tables or decay curves (calculations will not include background radiation)' },
                            { name: 'Calculate half-life from data or decay curves from which background radiation has not been subtracted', isSupplement: true },
                            { name: 'Explain how the type of radiation emitted and the half-life of an isotope determine which isotope is used for applications including: (a) household fire (smoke) alarms (b) irradiating food to kill bacteria (c) sterilisation of equipment using gamma rays (d) measuring and controlling thicknesses of materials (e) diagnosis and treatment of cancer using gamma rays', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Safety precautions',
                        indicators: [
                            { name: 'State the effects of ionising nuclear radiations on living things, including cell death, mutations and cancer' },
                            { name: 'Describe how radioactive materials are moved, used and stored in a safe way' },
                            { name: 'Explain safety precautions for all ionising radiation in terms of reducing exposure time, increasing distance between source and living tissue and using shielding to absorb radiation', isSupplement: true }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'Space physics',
        icon: <SpaceIcon />,
        topics: [
            {
                name: 'The Earth and the Solar System',
                subTopics: [
                    {
                        name: 'The Earth',
                        indicators: [
                            { name: 'Know that the Earth is a planet that rotates on its axis, which is tilted, once in approximately 24 hours, and use this to explain observations of the apparent daily motion of the Sun and the periodic cycle of day and night' },
                            { name: 'Know that the Earth orbits the Sun once in approximately 365 days and use this to explain the periodic nature of the seasons' },
                            { name: 'Know that it takes approximately one month for the Moon to orbit the Earth and use this to explain the periodic nature of the Moon’s cycle of phases' },
                            { name: 'Define average orbital speed from the equation v = 2πr/T where r is the average radius of the orbit and T is the orbital period; recall and use this equation', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The Solar System',
                        indicators: [
                            { name: 'Describe the Solar System as containing: (a) one star, the Sun (b) the eight named planets and know their order from the Sun (c) minor planets that orbit the Sun, including dwarf planets such as Pluto and asteroids in the asteroid belt (d) moons, that orbit the planets (e) smaller Solar System bodies, including comets and natural satellites' },
                            { name: 'Know that, in comparison to each other, the four planets nearest the Sun are rocky and small and the four planets furthest from the Sun are gaseous and large, and explain this difference by referring to an accretion model for Solar System formation' },
                            { name: 'Know that the strength of the gravitational field (a) at the surface of a planet depends on the mass of the planet (b) around a planet decreases as the distance from the planet increases' },
                            { name: 'Calculate the time it takes light to travel a significant distance such as between objects in the Solar System' },
                            { name: 'Know that the Sun contains most of the mass of the Solar System and this explains why the planets orbit the Sun' },
                            { name: 'Know that the force that keeps an object in orbit around the Sun is the gravitational attraction of the Sun' },
                            { name: 'Know that planets, minor planets and comets have elliptical orbits, and recall that the Sun is not at the centre of the elliptical orbit, except when the orbit is approximately circular', isSupplement: true },
                            { name: 'Analyse and interpret planetary data about orbital distance, orbital duration, density, surface temperature and uniform gravitational field strength at the planet’s surface', isSupplement: true },
                            { name: 'Know that the strength of the Sun’s gravitational field decreases and that the orbital speeds of the planets decrease as the distance from the Sun increases', isSupplement: true },
                            { name: 'Know that an object in an elliptical orbit travels faster when closer to the Sun and explain this using the conservation of energy', isSupplement: true }
                        ]
                    }
                ]
            },
            {
                name: 'Stars and the Universe',
                subTopics: [
                    {
                        name: 'The Sun as a star',
                        indicators: [
                            { name: 'Know that the Sun is a star of medium size, consisting mostly of hydrogen and helium, and that it radiates most of its energy in the infrared, visible light and ultraviolet regions of the electromagnetic spectrum' },
                            { name: 'Know that stars are powered by nuclear reactions that release energy and that in stable stars the nuclear reactions involve the fusion of hydrogen into helium', isSupplement: true }
                        ]
                    },
                    {
                        name: 'Stars',
                        indicators: [
                            { name: 'State that: (a) galaxies are each made up of many billions of stars (b) the Sun is a star in the galaxy known as the Milky Way (c) other stars that make up the Milky Way are much further away from the Earth than the Sun is from the Earth (d) astronomical distances can be measured in light-years' },
                            { name: 'Know that one light-year is equal to 9.5 × 10¹⁵ m', isSupplement: true },
                            { name: 'Describe the life cycle of a star: (a) formation from interstellar clouds (b) protostar (c) stable star (d) red giants and red supergiants (e) planetary nebula and white dwarf (f) supernova, neutron star and black hole', isSupplement: true }
                        ]
                    },
                    {
                        name: 'The Universe',
                        indicators: [
                            { name: 'Know that the Milky Way is one of many billions of galaxies making up the Universe and that the diameter of the Milky Way is approximately 100 000 light-years' },
                            { name: 'Describe redshift as an increase in the observed wavelength of electromagnetic radiation emitted from receding stars and galaxies' },
                            { name: 'Know that the light emitted from distant galaxies appears redshifted in comparison with light emitted on the Earth' },
                            { name: 'Know that redshift in the light from distant galaxies is evidence that the Universe is expanding and supports the Big Bang Theory' },
                            { name: 'Know that microwave radiation of a specific frequency is observed at all points in space around us and is known as cosmic microwave background radiation (CMBR)', isSupplement: true },
                            { name: 'Explain that the CMBR was produced shortly after the Universe was formed and that this radiation has been expanded into the microwave region of the electromagnetic spectrum as the Universe expanded', isSupplement: true },
                            { name: 'Know that the speed v at which a galaxy is moving away from the Earth can be found from the change in wavelength of the galaxy’s starlight due to redshift', isSupplement: true },
                            { name: 'Know that the distance d of a far galaxy can be determined using the brightness of a supernova in that galaxy', isSupplement: true },
                            { name: 'Define the Hubble constant H₀ as the ratio of the speed at which the galaxy is moving away from the Earth to its distance from the Earth; recall and use the equation H₀ = v/d', isSupplement: true },
                            { name: 'Know that the current estimate for H₀ is 2.2 × 10⁻¹⁸ per second', isSupplement: true },
                            { name: 'Know that the equation d/v = 1/H₀ represents an estimate for the age of the Universe and that this is evidence for the idea that all the matter in the Universe was present at a single point', isSupplement: true }
                        ]
                    }
                ]
            }
        ]
    }
];

export const BIOLOGY_CATEGORIES: Category[] = [
    {
        name: 'Cellular Biology & Biochemistry',
        icon: <CellularIcon />,
        topics: [
            {
                name: 'Characteristics and classification of living organisms',
                subTopics: [
                    {
                        name: 'Characteristics of living organisms',
                        indicators: [
                            { name: 'Describe the characteristics of living organisms by describing: (a) movement (b) respiration (c) sensitivity (d) growth (e) reproduction (f) excretion (g) nutrition' },
                        ],
                    },
                    {
                        name: 'Concept and uses of classification systems',
                        indicators: [
                            { name: 'State that organisms can be classified into groups by the features that they share' },
                            { name: 'Describe a species as a group of organisms that can reproduce to produce fertile offspring' },
                            { name: 'Describe the binomial system of naming species' },
                            { name: 'Construct and use dichotomous keys' },
                            { name: 'Explain that classification systems aim to reflect evolutionary relationships', isSupplement: true },
                            { name: 'Explain that the sequences of bases in DNA are used as a means of classification', isSupplement: true },
                            { name: 'Explain that groups of organisms which share a more recent ancestor have more similar DNA base sequences', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Features of organisms',
                        indicators: [
                            { name: 'State the main features used to place animals and plants into the appropriate kingdoms' },
                            { name: 'State the main features used to place organisms into groups within the animal kingdom (vertebrates and arthropods)' },
                            { name: 'Classify organisms using the features of vertebrates and arthropods' },
                            { name: 'State the main features used to place all organisms into one of the five kingdoms: animal, plant, fungus, prokaryote, protoctist', isSupplement: true },
                            { name: 'State the main features used to place organisms into groups within the plant kingdom (ferns and flowering plants)', isSupplement: true },
                            { name: 'Classify organisms using the features of the five kingdoms and plant groups', isSupplement: true },
                            { name: 'State the features of viruses, limited to a protein coat and genetic material', isSupplement: true },
                        ],
                    },
                ]
            },
            {
                name: 'Organisation of the organism',
                subTopics: [
                     {
                        name: 'Cell structure',
                        indicators: [
                            { name: 'Describe and compare the structure of a plant cell with an animal cell' },
                            { name: 'Describe the structure of a bacterial cell' },
                            { name: 'Identify cell structures in diagrams and images' },
                            { name: 'Describe the functions of the cell structures' },
                            { name: 'State that new cells are produced by division of existing cells' },
                            { name: 'State that specialised cells have specific functions' },
                            { name: 'Describe the meaning of the terms: cell, tissue, organ, organ system and organism' },
                        ],
                    },
                    {
                        name: 'Size of specimens',
                        indicators: [
                            { name: 'State and use the formula: magnification = image size ÷ actual size' },
                            { name: 'Calculate magnification and size of biological specimens using millimetres' },
                            { name: 'Convert measurements between millimetres (mm) and micrometres (μm)', isSupplement: true },
                        ]
                    }
                ]
            },
            {
                name: 'Movement into and out of cells',
                subTopics: [
                    {
                        name: 'Diffusion',
                        indicators: [
                            { name: 'Describe diffusion as the net movement of particles down a concentration gradient' },
                            { name: 'State that the energy for diffusion comes from the kinetic energy of random movement' },
                            { name: 'State that some substances move into and out of cells by diffusion' },
                            { name: 'Describe the importance of diffusion of gases and solutes' },
                            { name: 'Investigate the factors that influence diffusion (surface area, temperature, concentration gradient, distance)' },
                        ]
                    },
                    {
                        name: 'Osmosis',
                        indicators: [
                            { name: 'Describe the role of water as a solvent' },
                            { name: 'State that water diffuses through partially permeable membranes by osmosis' },
                            { name: 'State that water moves into and out of cells by osmosis' },
                            { name: 'Investigate osmosis using materials such as dialysis tubing' },
                            { name: 'Investigate and describe the effects on plant tissues of immersing them in solutions of different concentrations' },
                            { name: 'State that plants are supported by the pressure of water inside the cells' },
                            { name: 'Describe osmosis as the net movement of water molecules from a region of higher water potential to a region of lower water potential', isSupplement: true },
                            { name: 'Explain the effects on plant cells of immersing them in solutions of different concentrations using the terms: turgid, turgor pressure, plasmolysis, flaccid', isSupplement: true },
                            { name: 'Explain the importance of water potential and osmosis in the uptake and loss of water by organisms', isSupplement: true },
                        ]
                    },
                    {
                        name: 'Active transport',
                        indicators: [
                            { name: 'Describe active transport as the movement of particles against a concentration gradient using energy from respiration' },
                            { name: 'Explain the importance of active transport as a process for movement across membranes (e.g. ion uptake by root hairs)', isSupplement: true },
                            { name: 'State that protein carriers move molecules or ions across a membrane during active transport', isSupplement: true },
                        ]
                    }
                ]
            },
            {
                name: 'Biological molecules',
                indicators: [
                    { name: 'List the chemical elements that make up: carbohydrates, fats and proteins' },
                    { name: 'State that large molecules are made from smaller molecules (e.g. starch from glucose)' },
                    { name: 'Describe the use of: iodine, Benedict\'s solution, biuret, ethanol emulsion, and DCPIP tests' },
                    { name: 'Describe the structure of a DNA molecule: two strands, double helix, bases, A with T, C with G', isSupplement: true },
                ]
            },
            {
                name: 'Enzymes',
                indicators: [
                    { name: 'Describe a catalyst as a substance that increases the rate of a chemical reaction and is not changed by the reaction' },
                    { name: 'Describe enzymes as proteins that function as biological catalysts' },
                    { name: 'Describe why enzymes are important in all living organisms' },
                    { name: 'Describe enzyme action with reference to the active site and substrate' },
                    { name: 'Investigate and describe the effect of changes in temperature and pH on enzyme activity' },
                    { name: 'Explain enzyme action with reference to: active site, enzyme-substrate complex, substrate and product', isSupplement: true },
                    { name: 'Explain the specificity of enzymes in terms of the complementary shape and fit of the active site with the substrate', isSupplement: true },
                    { name: 'Explain the effect of changes in temperature on enzyme activity', isSupplement: true },
                    { name: 'Explain the effect of changes in pH on enzyme activity', isSupplement: true },
                ]
            }
        ]
    },
    {
        name: 'Plant and Animal Physiology',
        icon: <PhysiologyIcon />,
        topics: [
            { name: 'Plant nutrition', subTopics: [
                { name: 'Photosynthesis', indicators: [
                    { name: 'Describe photosynthesis as the process by which plants synthesise carbohydrates from raw materials using energy from light' },
                    { name: 'State the word equation for photosynthesis' },
                    { name: 'State that chlorophyll is a green pigment found in chloroplasts' },
                    { name: 'State that chlorophyll transfers energy from light into chemical energy' },
                    { name: 'Outline the subsequent use and storage of the carbohydrates made in photosynthesis' },
                    { name: 'Explain the importance of nitrate ions and magnesium ions for plants' },
                    { name: 'Investigate the need for chlorophyll, light and carbon dioxide for photosynthesis' },
                    { name: 'Investigate and describe the effects of varying light intensity, CO2 concentration and temperature on the rate of photosynthesis' },
                    { name: 'Investigate the effect of light and dark conditions on gas exchange in an aquatic plant' },
                    { name: 'State the balanced chemical equation for photosynthesis', isSupplement: true },
                    { name: 'Identify and explain the limiting factors of photosynthesis', isSupplement: true },
                ]},
                { name: 'Leaf structure', indicators: [
                    { name: 'State that most leaves have a large surface area and are thin, and explain how these features are adaptations for photosynthesis' },
                    { name: 'Identify structures in the leaf of a dicotyledonous plant' },
                    { name: 'Explain how the structures of the leaf adapt it for photosynthesis' },
                ]},
            ]},
            { name: 'Human nutrition', subTopics: [
                { name: 'Diet', indicators: [
                    { name: 'Describe what is meant by a balanced diet' },
                    { name: 'State the principal dietary sources and importance of: carbohydrates, fats, proteins, vitamins C & D, calcium, iron, fibre, water' },
                    { name: 'State the causes of scurvy and rickets' },
                ]},
                { name: 'Digestive system', indicators: [
                    { name: 'Identify the main organs of the digestive system' },
                    { name: 'Describe the functions of the organs of the digestive system in relation to: ingestion, digestion, absorption, assimilation, egestion' },
                ]},
                { name: 'Physical digestion', indicators: [
                    { name: 'Describe physical digestion' },
                    { name: 'State that physical digestion increases the surface area for enzymes' },
                    { name: 'Identify the types of human teeth' },
                    { name: 'Describe the structure of human teeth' },
                    { name: 'Describe the functions of the types of human teeth' },
                    { name: 'Describe the function of the stomach in physical digestion' },
                    { name: 'Outline the role of bile in emulsifying fats and oils', isSupplement: true },
                ]},
                { name: 'Chemical digestion', indicators: [
                    { name: 'Describe chemical digestion' },
                    { name: 'State the role of chemical digestion in producing small soluble molecules' },
                    { name: 'Describe the functions of amylase, proteases and lipase' },
                    { name: 'State where amylase, protease and lipase are secreted and where they act' },
                    { name: 'Describe the functions of hydrochloric acid in gastric juice' },
                    { name: 'Describe the digestion of starch by amylase and maltase', isSupplement: true },
                    { name: 'Describe the digestion of protein by pepsin and trypsin', isSupplement: true },
                    { name: 'Explain that bile is an alkaline mixture that neutralises acidic food from the stomach', isSupplement: true },
                ]},
                { name: 'Absorption', indicators: [
                    { name: 'State that the small intestine is the region where nutrients are absorbed' },
                    { name: 'State that most water is absorbed from the small intestine' },
                    { name: 'Explain the significance of villi and microvilli in increasing the internal surface area', isSupplement: true },
                    { name: 'Describe the structure of a villus', isSupplement: true },
                    { name: 'Describe the roles of capillaries and lacteals in villi', isSupplement: true },
                ]},
            ]},
            { name: 'Transport in plants', subTopics: [
                { name: 'Xylem and phloem', indicators: [
                    { name: 'State the functions of xylem and phloem' },
                    { name: 'Identify the position of xylem and phloem in roots, stems and leaves' },
                    { name: 'Relate the structure of xylem vessels to their function', isSupplement: true },
                ]},
                { name: 'Water uptake', indicators: [
                    { name: 'Identify root hair cells and state their functions' },
                    { name: 'State that the large surface area of root hairs increases water uptake' },
                    { name: 'Outline the pathway taken by water through the root, stem and leaf' },
                    { name: 'Investigate the pathway of water through a plant' },
                ]},
                { name: 'Transpiration', indicators: [
                    { name: 'Describe transpiration as the loss of water vapour from leaves' },
                    { name: 'State that water evaporates from mesophyll cells and diffuses through stomata' },
                    { name: 'Investigate the effects of temperature and wind speed on transpiration rate' },
                    { name: 'Explain how water vapour loss is related to internal surface area and stomata', isSupplement: true },
                    { name: 'Explain the mechanism of water movement upwards in the xylem (transpiration pull)', isSupplement: true },
                    { name: 'Explain the effects of temperature, wind speed and humidity on transpiration rate', isSupplement: true },
                    { name: 'Explain how and why wilting occurs', isSupplement: true },
                ]},
                { name: 'Translocation', isSupplement: true, indicators: [
                    { name: 'Describe translocation as the movement of sucrose and amino acids in phloem from sources to sinks', isSupplement: true },
                    { name: 'Describe sources and sinks in plants', isSupplement: true },
                    { name: 'Explain why some parts of a plant may act as a source and a sink at different times', isSupplement: true },
                ]},
            ]},
            { name: 'Transport in animals', subTopics: [
                { name: 'Circulatory systems', indicators: [
                    { name: 'Describe the circulatory system as a system of blood vessels with a pump and valves' },
                    { name: 'Describe the single circulation of a fish', isSupplement: true },
                    { name: 'Describe the double circulation of a mammal', isSupplement: true },
                    { name: 'Explain the advantages of a double circulation', isSupplement: true },
                ]},
                { name: 'Heart', indicators: [
                    { name: 'Identify the structures of the mammalian heart' },
                    { name: 'State that blood is pumped away from the heart in arteries and returns in veins' },
                    { name: 'State that heart activity may be monitored by ECG, pulse rate and listening to sounds of valves' },
                    { name: 'Investigate and describe the effect of physical activity on the heart rate' },
                    { name: 'Describe coronary heart disease and its risk factors' },
                    { name: 'Discuss the roles of diet and exercise in reducing the risk of coronary heart disease' },
                    { name: 'Identify the atrioventricular and semilunar valves in the heart', isSupplement: true },
                    { name: 'Explain the relative thickness of the muscle walls of the heart chambers', isSupplement: true },
                    { name: 'Explain the importance of the septum', isSupplement: true },
                    { name: 'Describe the functioning of the heart in terms of contraction of muscles and action of valves', isSupplement: true },
                    { name: 'Explain the effect of physical activity on the heart rate', isSupplement: true },
                ]},
                { name: 'Blood vessels', indicators: [
                    { name: 'Describe the structure of arteries, veins and capillaries' },
                    { name: 'State the functions of capillaries' },
                    { name: 'Identify the main blood vessels to and from the heart, lungs and kidney' },
                    { name: 'Explain how the structure of arteries and veins is related to the pressure of the blood', isSupplement: true },
                    { name: 'Explain how the structure of capillaries is related to their functions', isSupplement: true },
                    { name: 'Identify the main blood vessels to and from the liver', isSupplement: true },
                ]},
                { name: 'Blood', indicators: [
                    { name: 'List the components of blood' },
                    { name: 'Identify red and white blood cells' },
                    { name: 'State the functions of red blood cells, white blood cells, platelets and plasma' },
                    { name: 'State the roles of blood clotting' },
                    { name: 'Identify lymphocytes and phagocytes', isSupplement: true },
                    { name: 'State the functions of lymphocytes and phagocytes', isSupplement: true },
                    { name: 'Describe the process of clotting (fibrinogen to fibrin)', isSupplement: true },
                ]},
            ]},
        ]
    },
    {
        name: 'Human Health and Physiology',
        icon: <HumanHealthIcon />,
        topics: [
            { name: 'Diseases and immunity', indicators: [
                { name: 'Describe a pathogen' },
                { name: 'Describe a transmissible disease' },
                { name: 'State how pathogens are transmitted' },
                { name: 'Describe the body defences: skin, hairs in nose, mucus, stomach acid, white blood cells' },
                { name: 'Explain the importance of hygiene and sanitation in controlling disease spread' },
                { name: 'Describe active immunity', isSupplement: true },
                { name: 'State that each pathogen has its own antigens', isSupplement: true },
                { name: 'Describe antibodies and their function', isSupplement: true },
                { name: 'State that specific antibodies fit specific antigens', isSupplement: true },
                { name: 'Explain how active immunity is gained (infection or vaccination)', isSupplement: true },
                { name: 'Outline the process of vaccination', isSupplement: true },
                { name: 'Explain the role of vaccination in controlling the spread of diseases', isSupplement: true },
                { name: 'Explain that passive immunity is short-term', isSupplement: true },
                { name: 'Explain the importance of breast-feeding for passive immunity', isSupplement: true },
                { name: 'State that memory cells are not produced in passive immunity', isSupplement: true },
                { name: 'Describe cholera', isSupplement: true },
                { name: 'Explain how the cholera bacterium causes diarrhoea', isSupplement: true },
            ]},
            { name: 'Gas exchange in humans', indicators: [
                { name: 'Describe the features of gas exchange surfaces in humans' },
                { name: 'Identify the parts of the breathing system' },
                { name: 'Investigate the differences between inspired and expired air using limewater' },
                { name: 'Describe the differences in composition between inspired and expired air' },
                { name: 'Investigate and describe the effects of physical activity on breathing' },
                { name: 'Identify the internal and external intercostal muscles', isSupplement: true },
                { name: 'State the function of cartilage in the trachea', isSupplement: true },
                { name: 'Explain the role of ribs, intercostal muscles and diaphragm in ventilation', isSupplement: true },
                { name: 'Explain the differences in composition between inspired and expired air', isSupplement: true },
                { name: 'Explain the link between physical activity and breathing rate', isSupplement: true },
                { name: 'Explain the role of goblet cells, mucus and ciliated cells', isSupplement: true },
            ]},
            { name: 'Respiration', subTopics: [
                { name: 'Respiration', indicators: [
                    { name: 'State the uses of energy in living organisms' },
                    { name: 'Investigate and describe the effect of temperature on respiration in yeast' },
                ]},
                { name: 'Aerobic respiration', indicators: [
                    { name: 'Describe aerobic respiration' },
                    { name: 'State the word equation for aerobic respiration' },
                    { name: 'State the balanced chemical equation for aerobic respiration', isSupplement: true },
                ]},
                { name: 'Anaerobic respiration', indicators: [
                    { name: 'Describe anaerobic respiration' },
                    { name: 'State that anaerobic respiration releases much less energy than aerobic' },
                    { name: 'State the word equation for anaerobic respiration in yeast' },
                    { name: 'State the word equation for anaerobic respiration in muscles' },
                    { name: 'State the balanced chemical equation for anaerobic respiration in yeast', isSupplement: true },
                    { name: 'State that lactic acid builds up in muscles during vigorous exercise causing an oxygen debt', isSupplement: true },
                    { name: 'Outline how the oxygen debt is removed after exercise', isSupplement: true },
                ]},
            ]},
            { name: 'Excretion in humans', indicators: [
                { name: 'State that carbon dioxide is excreted through the lungs' },
                { name: 'State that the kidneys excrete urea and excess water and ions' },
                { name: 'Identify the kidneys, ureters, bladder and urethra' },
                { name: 'Identify the structure of the kidney (cortex and medulla)', isSupplement: true },
                { name: 'Outline the structure and function of a nephron and its blood vessels', isSupplement: true },
                { name: 'Describe the role of the liver in assimilation of amino acids', isSupplement: true },
                { name: 'State that urea is formed in the liver from excess amino acids', isSupplement: true },
                { name: 'Describe deamination', isSupplement: true },
                { name: 'Explain the importance of excretion (toxicity of urea)', isSupplement: true },
            ]},
            { name: 'Coordination and response', subTopics: [
                { name: 'Coordination and response', indicators: [
                    { name: 'State that electrical impulses travel along neurones' },
                    { name: 'Describe the mammalian nervous system (CNS and PNS)' },
                    { name: 'Describe the role of the nervous system' },
                    { name: 'Identify sensory, relay and motor neurones' },
                    { name: 'Describe a simple reflex arc' },
                    { name: 'Describe a reflex action' },
                    { name: 'Describe a synapse as a junction between two neurones' },
                    { name: 'Describe the structure of a synapse', isSupplement: true },
                    { name: 'Describe the events at a synapse', isSupplement: true },
                    { name: 'State that synapses ensure that impulses travel in one direction only', isSupplement: true },
                ]},
                { name: 'Sense organs', indicators: [
                    { name: 'Describe sense organs as groups of receptor cells' },
                    { name: 'Identify the structures of the eye' },
                    { name: 'Describe the function of each part of the eye' },
                    { name: 'Explain the pupil reflex' },
                    { name: 'Explain the pupil reflex in terms of antagonistic muscle action', isSupplement: true },
                    { name: 'Explain accommodation to view near and distant objects', isSupplement: true },
                    { name: 'Describe the distribution of rods and cones in the retina', isSupplement: true },
                    { name: 'Outline the function of rods and cones', isSupplement: true },
                    { name: 'Identify the fovea and state its function', isSupplement: true },
                ]},
                { name: 'Hormones', indicators: [
                    { name: 'Describe a hormone' },
                    { name: 'Identify specific endocrine glands and the hormones they secrete' },
                    { name: 'Describe adrenaline and its effects' },
                    { name: 'Compare nervous and hormonal control' },
                    { name: 'State that glucagon is secreted by the pancreas', isSupplement: true },
                    { name: 'Describe the role of adrenaline in the control of metabolic activity', isSupplement: true },
                ]},
                { name: 'Homeostasis', indicators: [
                    { name: 'Describe homeostasis' },
                    { name: 'State that insulin decreases blood glucose concentration' },
                    { name: 'Explain homeostatic control by negative feedback', isSupplement: true },
                    { name: 'Describe the control of blood glucose concentration (insulin and glucagon)', isSupplement: true },
                    { name: 'Outline the treatment of Type 1 diabetes', isSupplement: true },
                    { name: 'Identify structures of the skin', isSupplement: true },
                    { name: 'Describe the maintenance of constant body temperature in mammals', isSupplement: true },
                    { name: 'Describe the role of vasodilation and vasoconstriction in temperature control', isSupplement: true },
                ]},
                 { name: 'Tropic responses', indicators: [
                    { name: 'Describe gravitropism' },
                    { name: 'Describe phototropism' },
                    { name: 'Investigate and describe gravitropism and phototropism' },
                    { name: 'Explain phototropism and gravitropism of a shoot', isSupplement: true },
                    { name: 'Explain the role of auxin in controlling shoot growth', isSupplement: true },
                ]},
            ]},
            { name: 'Drugs', indicators: [
                { name: 'Describe a drug' },
                { name: 'Describe the use of antibiotics for bacterial infections' },
                { name: 'State that some bacteria are resistant to antibiotics' },
                { name: 'State that antibiotics kill bacteria but do not affect viruses' },
                { name: 'Explain how using antibiotics only when essential can limit the development of resistant bacteria such as MRSA', isSupplement: true },
            ]},
        ]
    },
    {
        name: 'Genetics and Reproduction',
        icon: <GeneticsIcon />,
        topics: [
            { name: 'Reproduction', subTopics: [
                { name: 'Asexual reproduction', indicators: [
                    { name: 'Describe asexual reproduction' },
                    { name: 'Identify examples of asexual reproduction' },
                    { name: 'Discuss the advantages and disadvantages of asexual reproduction', isSupplement: true },
                ]},
                { name: 'Sexual reproduction', indicators: [
                    { name: 'Describe sexual reproduction' },
                    { name: 'Describe fertilisation' },
                    { name: 'State that nuclei of gametes are haploid and that the nucleus of a zygote is diploid', isSupplement: true },
                    { name: 'Discuss the advantages and disadvantages of sexual reproduction', isSupplement: true },
                ]},
                { name: 'Sexual reproduction in plants', indicators: [
                    { name: 'Identify and draw the parts of an insect-pollinated flower' },
                    { name: 'State the functions of the parts of a flower' },
                    { name: 'Identify and describe the anthers and stigmas of a wind-pollinated flower' },
                    { name: 'Distinguish between the pollen grains of insect- and wind-pollinated flowers' },
                    { name: 'Describe pollination' },
                    { name: 'State that fertilisation occurs when a pollen nucleus fuses with a nucleus in an ovule' },
                    { name: 'Describe the structural adaptations of insect- and wind-pollinated flowers' },
                    { name: 'Investigate the environmental conditions that affect germination' },
                    { name: 'Describe self-pollination', isSupplement: true },
                    { name: 'Describe cross-pollination', isSupplement: true },
                    { name: 'Discuss the potential effects of self- and cross-pollination on a population', isSupplement: true },
                    { name: 'Describe the growth of the pollen tube and its entry into the ovule', isSupplement: true },
                ]},
                { name: 'Sexual reproduction in humans', indicators: [
                    { name: 'Identify and state the functions of the male reproductive system' },
                    { name: 'Identify and state the functions of the female reproductive system' },
                    { name: 'Describe fertilisation in humans' },
                    { name: 'Explain the adaptive features of sperm' },
                    { name: 'Explain the adaptive features of egg cells' },
                    { name: 'Compare male and female gametes' },
                    { name: 'State that a zygote forms an embryo' },
                    { name: 'Identify and state the functions of the umbilical cord, placenta, amniotic sac and amniotic fluid' },
                    { name: 'Describe the function of the placenta and umbilical cord in exchange of materials', isSupplement: true },
                    { name: 'State that some pathogens and toxins can pass across the placenta', isSupplement: true },
                ]},
                { name: 'Sex hormones in humans', indicators: [
                    { name: 'Describe the roles of testosterone and oestrogen' },
                    { name: 'Describe the menstrual cycle' },
                    { name: 'Describe the sites of production of oestrogen and progesterone', isSupplement: true },
                    { name: 'Explain the role of hormones in controlling the menstrual cycle and pregnancy (FSH, LH, progesterone, oestrogen)', isSupplement: true },
                ]},
                { name: 'Sexually transmitted infections', indicators: [
                    { name: 'Describe a sexually transmitted infection (STI)' },
                    { name: 'State that human immunodeficiency virus (HIV) is a pathogen that causes an STI' },
                    { name: 'State that HIV infection may lead to AIDS' },
                    { name: 'Describe the methods of transmission of HIV' },
                    { name: 'Explain how the spread of STIs is controlled' },
                ]},
            ]},
            { name: 'Inheritance', subTopics: [
                { name: 'Chromosomes, genes and proteins', indicators: [
                    { name: 'State that chromosomes are made of DNA, containing genes' },
                    { name: 'Define a gene as a length of DNA that codes for a protein' },
                    { name: 'Define an allele as an alternative form of a gene' },
                    { name: 'Describe the inheritance of sex in humans (X and Y chromosomes)' },
                    { name: 'State that the sequence of bases in a gene determines the sequence of amino acids', isSupplement: true },
                    { name: 'Explain that different sequences of amino acids give different shapes to protein molecules', isSupplement: true },
                    { name: 'Explain that DNA controls cell function by controlling the production of proteins', isSupplement: true },
                    { name: 'Explain how a protein is made (mRNA, ribosome)', isSupplement: true },
                    { name: 'Explain that many genes in a particular cell are not expressed', isSupplement: true },
                    { name: 'Describe a haploid nucleus', isSupplement: true },
                    { name: 'Describe a diploid nucleus', isSupplement: true },
                    { name: 'State that in a diploid cell, there are 23 pairs of chromosomes', isSupplement: true },
                ]},
                { name: 'Mitosis', isSupplement: true, indicators: [
                    { name: 'Describe mitosis as nuclear division giving rise to genetically identical cells', isSupplement: true },
                    { name: 'State the role of mitosis (growth, repair, replacement, asexual reproduction)', isSupplement: true },
                    { name: 'State that exact replication of chromosomes occurs before mitosis', isSupplement: true },
                    { name: 'State that during mitosis, copies of chromosomes separate, maintaining the chromosome number', isSupplement: true },
                    { name: 'Describe stem cells', isSupplement: true },
                ]},
                { name: 'Meiosis', isSupplement: true, indicators: [
                    { name: 'State that meiosis is involved in the production of gametes', isSupplement: true },
                    { name: 'Describe meiosis as a reduction division in which the chromosome number is halved', isSupplement: true },
                ]},
                { name: 'Monohybrid inheritance', indicators: [
                    { name: 'Describe inheritance' },
                    { name: 'Describe genotype' },
                    { name: 'Describe phenotype' },
                    { name: 'Describe homozygous' },
                    { name: 'State that two identical homozygous individuals that breed together will be pure-breeding' },
                    { name: 'Describe heterozygous' },
                    { name: 'State that a heterozygous individual will not be pure-breeding' },
                    { name: 'Describe a dominant allele' },
                    { name: 'Describe a recessive allele' },
                    { name: 'Interpret pedigree diagrams' },
                    { name: 'Use genetic diagrams to predict the results of monohybrid crosses' },
                    { name: 'Use Punnett squares' },
                    { name: 'Explain how to use a test cross to identify an unknown genotype', isSupplement: true },
                    { name: 'Describe codominance', isSupplement: true },
                    { name: 'Explain the inheritance of ABO blood groups', isSupplement: true },
                    { name: 'Describe a sex-linked characteristic', isSupplement: true },
                    { name: 'Describe red-green colour blindness as an example of sex linkage', isSupplement: true },
                    { name: 'Use genetic diagrams to predict results of crosses involving codominance or sex linkage', isSupplement: true },
                ]},
            ]},
            { name: 'Variation and selection', subTopics: [
                { name: 'Variation', indicators: [
                    { name: 'Describe variation' },
                    { name: 'State that continuous variation results in a range of phenotypes' },
                    { name: 'State that discontinuous variation results in a limited number of phenotypes' },
                    { name: 'State that discontinuous variation is caused by genes only, and continuous is caused by genes and environment' },
                    { name: 'Investigate and describe examples of continuous and discontinuous variation' },
                    { name: 'Describe mutation as genetic change' },
                    { name: 'State that mutation is the way in which new alleles are formed' },
                    { name: 'State that ionising radiation and some chemicals increase the rate of mutation' },
                    { name: 'Describe gene mutation as a random change in the base sequence of DNA', isSupplement: true },
                    { name: 'State that mutation, meiosis, random mating and random fertilisation are sources of genetic variation', isSupplement: true },
                ]},
                { name: 'Adaptive features', indicators: [
                    { name: 'Describe an adaptive feature' },
                    { name: 'Interpret images or other information to describe a species\' adaptive features' },
                    { name: 'Explain the adaptive features of hydrophytes and xerophytes', isSupplement: true },
                ]},
                { name: 'Selection', indicators: [
                    { name: 'Describe natural selection' },
                    { name: 'Describe selective breeding' },
                    { name: 'Outline how selective breeding is carried out' },
                    { name: 'Describe adaptation as the process resulting from natural selection', isSupplement: true },
                    { name: 'Describe the development of antibiotic resistant bacteria as an example of natural selection', isSupplement: true },
                    { name: 'Outline the differences between natural and artificial selection', isSupplement: true },
                ]},
            ]},
        ]
    },
    {
        name: 'Ecology and Biotechnology',
        icon: <EcologyIcon />,
        topics: [
            { name: 'Organisms and their environment', subTopics: [
                { name: 'Energy flow', indicators: [
                    { name: 'State that the Sun is the principal source of energy input to biological systems' },
                    { name: 'Describe the flow of energy through living organisms' },
                ]},
                { name: 'Food chains and food webs', indicators: [
                    { name: 'Describe a food chain' },
                    { name: 'Construct and interpret simple food chains' },
                    { name: 'Describe a food web' },
                    { name: 'Describe a producer' },
                    { name: 'Describe a consumer' },
                    { name: 'State that consumers may be classed as primary, secondary, tertiary and quaternary' },
                    { name: 'Describe a herbivore' },
                    { name: 'Describe a carnivore' },
                    { name: 'Describe a decomposer' },
                    { name: 'Use food chains and food webs to describe the impact of humans' },
                    { name: 'Draw, describe and interpret pyramids of numbers and pyramids of biomass' },
                    { name: 'Discuss the advantages of using a pyramid of biomass over a pyramid of numbers' },
                    { name: 'Describe a trophic level' },
                    { name: 'Identify trophic levels in food webs, chains and pyramids' },
                    { name: 'Draw, describe and interpret pyramids of energy', isSupplement: true },
                    { name: 'Discuss the advantages of using a pyramid of energy', isSupplement: true },
                    { name: 'Explain why the transfer of energy from one trophic level to another is often not efficient', isSupplement: true },
                    { name: 'Explain, in terms of energy loss, why food chains usually have fewer than five trophic levels', isSupplement: true },
                    { name: 'Explain why it is more energy efficient for humans to eat crop plants than livestock', isSupplement: true },
                ]},
                { name: 'Nutrient cycles', indicators: [
                    { name: 'Describe the carbon cycle' },
                    { name: 'Describe the nitrogen cycle with reference to decomposition, nitrification, nitrogen fixation, absorption, protein production, feeding, deamination, denitrification', isSupplement: true },
                    { name: 'State the roles of microorganisms in the nitrogen cycle', isSupplement: true },
                ]},
                { name: 'Populations', indicators: [
                    { name: 'Describe a population' },
                    { name: 'Describe a community' },
                    { name: 'Describe an ecosystem' },
                    { name: 'Identify and state the factors affecting the rate of population growth (food supply, competition, predation, disease)' },
                    { name: 'Identify the phases in the sigmoid curve of population growth' },
                    { name: 'Interpret graphs and diagrams of population growth' },
                    { name: 'Explain the factors that lead to each phase in the sigmoid curve of population growth', isSupplement: true },
                ]},
            ]},
            { name: 'Human influences on ecosystems', subTopics: [
                { name: 'Food supply', indicators: [
                    { name: 'Describe how humans have increased food production (machinery, fertilisers, insecticides, herbicides, selective breeding)' },
                    { name: 'Describe the advantages and disadvantages of large-scale monocultures of crop plants' },
                    { name: 'Describe the advantages and disadvantages of intensive livestock production' },
                ]},
                { name: 'Habitat destruction', indicators: [
                    { name: 'Describe biodiversity' },
                    { name: 'Describe the reasons for habitat destruction' },
                    { name: 'State that humans can have a negative impact on habitats by altering food webs' },
                    { name: 'Explain the undesirable effects of deforestation' },
                ]},
                { name: 'Pollution', indicators: [
                    { name: 'Describe the effects of untreated sewage and excess fertiliser on aquatic ecosystems' },
                    { name: 'Describe the effects of non-biodegradable plastics' },
                    { name: 'Describe the sources and effects of air pollution by methane and carbon dioxide' },
                    { name: 'Explain the process of eutrophication of water', isSupplement: true },
                ]},
                { name: 'Conservation', indicators: [
                    { name: 'Describe a sustainable resource' },
                    { name: 'State that some resources can be conserved and managed sustainably (forests, fish stocks)' },
                    { name: 'Explain why organisms become endangered or extinct' },
                    { name: 'Describe how endangered species can be conserved (monitoring, education, captive breeding, seed banks)' },
                    { name: 'Explain how forests can be conserved', isSupplement: true },
                    { name: 'Explain how fish stocks can be conserved', isSupplement: true },
                    { name: 'Describe the reasons for conservation programmes', isSupplement: true },
                    { name: 'Describe the use of artificial insemination (AI) and in vitro fertilisation (IVF) in captive breeding', isSupplement: true },
                    { name: 'Explain the risks to a species if its population size decreases', isSupplement: true },
                ]},
            ]},
            { name: 'Biotechnology and genetic modification', subTopics: [
                { name: 'Biotechnology and genetic modification', indicators: [
                    { name: 'State that bacteria are useful in biotechnology and genetic modification' },
                    { name: 'Discuss why bacteria are useful in biotechnology and genetic modification', isSupplement: true },
                ]},
                { name: 'Biotechnology', indicators: [
                    { name: 'Describe the role of anaerobic respiration in yeast during production of ethanol for biofuels' },
                    { name: 'Describe the role of anaerobic respiration in yeast during bread-making' },
                    { name: 'Describe the use of pectinase in fruit juice production' },
                    { name: 'Investigate and describe the use of biological washing powders that contain enzymes' },
                    { name: 'Explain the use of lactase to produce lactose-free milk', isSupplement: true },
                    { name: 'Describe how fermenters can be used for the large-scale production of useful products', isSupplement: true },
                    { name: 'Describe and explain the conditions that need to be controlled in a fermenter', isSupplement: true },
                ]},
                { name: 'Genetic modification', indicators: [
                    { name: 'Describe genetic modification' },
                    { name: 'Outline examples of genetic modification: human proteins in bacteria, herbicide resistance, insect resistance, improved nutrition' },
                    { name: 'Outline the process of genetic modification using bacterial production of a human protein as an example', isSupplement: true },
                    { name: 'Discuss the advantages and disadvantages of genetically modifying crops', isSupplement: true },
                ]},
            ]},
        ]
    }
];

export const CHEMISTRY_CATEGORIES: Category[] = [
    {
        name: 'Principles of Chemistry',
        icon: <AtomIcon />,
        topics: [
            {
                name: 'States of matter',
                subTopics: [
                    {
                        name: 'Solids, liquids and gases',
                        indicators: [
                            { name: 'State the distinguishing properties of solids, liquids and gases' },
                            { name: 'Describe the structures of solids, liquids and gases in terms of particle separation, arrangement and motion' },
                            { name: 'Describe changes of state in terms of melting, boiling, evaporating, freezing and condensing' },
                            { name: 'Describe the effects of temperature and pressure on the volume of a gas' },
                            { name: 'Explain changes of state in terms of kinetic particle theory, including the interpretation of heating and cooling curves', isSupplement: true },
                            { name: 'Explain, in terms of kinetic particle theory, the effects of temperature and pressure on the volume of a gas', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Diffusion',
                        indicators: [
                            { name: 'Describe and explain diffusion in terms of kinetic particle theory' },
                            { name: 'Describe and explain the effect of relative molecular mass on the rate of diffusion of gases', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'Atoms, elements and compounds',
                subTopics: [
                    { name: 'Elements, compounds and mixtures', indicators: [{ name: 'Describe the differences between elements, compounds and mixtures' }] },
                    {
                        name: 'Atomic structure and the Periodic Table',
                        indicators: [
                            { name: 'Describe the structure of the atom as a central nucleus containing neutrons and protons surrounded by electrons in shells' },
                            { name: 'State the relative charges and relative masses of a proton, a neutron and an electron' },
                            { name: 'Define proton number/atomic number as the number of protons in the nucleus of an atom' },
                            { name: 'Define mass number/nucleon number as the total number of protons and neutrons in the nucleus of an atom' },
                            { name: 'Determine the electronic configuration of elements and their ions with proton number 1 to 20, e.g. 2,8,3' },
                            { name: 'State that: (a) Group VIII noble gases have a full outer electron shell, (b) the number of outer shell electrons is equal to the group number in Groups I to VII, (c) the number of occupied electron shells is equal to the period number' },
                        ],
                    },
                    {
                        name: 'Isotopes',
                        indicators: [
                            { name: 'Define isotopes as different atoms of the same element that have the same number of protons but different numbers of neutrons' },
                            { name: 'Interpret and use symbols for atoms, e.g. ¹²C, and ions, e.g. ³⁵Cl⁻' },
                            { name: 'State that isotopes of the same element have the same chemical properties because they have the same number of electrons and therefore the same electronic configuration', isSupplement: true },
                            { name: 'Calculate the relative atomic mass of an element from the relative masses and abundances of its isotopes', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Ions and ionic bonds',
                        indicators: [
                            { name: 'Describe the formation of positive ions, known as cations, and negative ions, known as anions' },
                            { name: 'State that an ionic bond is a strong electrostatic attraction between oppositely charged ions' },
                            { name: 'Describe the formation of ionic bonds between elements from Group I and Group VII, including the use of dot-and-cross diagrams' },
                            { name: 'Describe the properties of ionic compounds: (a) high melting points and boiling points, (b) good electrical conductivity when aqueous or molten and poor when solid' },
                            { name: 'Describe the giant lattice structure of ionic compounds as a regular arrangement of alternating positive and negative ions', isSupplement: true },
                            { name: 'Describe the formation of ionic bonds between ions of metallic and non-metallic elements, including the use of dot-and-cross diagrams', isSupplement: true },
                            { name: 'Explain in terms of structure and bonding the properties of ionic compounds: (a) high melting points and boiling points, (b) good electrical conductivity when aqueous or molten and poor when solid', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Simple molecules and covalent bonds',
                        indicators: [
                            { name: 'State that a covalent bond is formed when a pair of electrons is shared between two atoms leading to noble gas electronic configurations' },
                            { name: 'Describe the formation of covalent bonds in simple molecules, including H₂, Cl₂, H₂O, CH₄, NH₃ and HCl. Use dot-and-cross diagrams to show the electronic configurations in these and similar molecules' },
                            { name: 'Describe in terms of structure and bonding the properties of simple molecular compounds: (a) low melting points and boiling points, (b) poor electrical conductivity' },
                            { name: 'Describe the formation of covalent bonds in simple molecules, including CH₃OH, C₂H₄, O₂, CO₂ and N₂. Use dot-and-cross diagrams to show the electronic configurations in these and similar molecules', isSupplement: true },
                            { name: 'Explain in terms of structure and bonding the properties of simple molecular compounds: (a) low melting points and boiling points in terms of weak intermolecular forces (specific types of intermolecular forces are not required), (b) poor electrical conductivity', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Giant covalent structures',
                        indicators: [
                            { name: 'Describe the giant covalent structures of graphite and diamond' },
                            { name: 'Relate the structures and bonding of graphite and diamond to their uses, limited to: (a) graphite as a lubricant and as an electrode, (b) diamond in cutting tools' },
                            { name: 'Describe the giant covalent structure of silicon(IV) oxide, SiO₂', isSupplement: true },
                            { name: 'Describe the similarity in properties between diamond and silicon(IV) oxide, related to their structures', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Metallic bonding',
                        isSupplement: true,
                        indicators: [
                            { name: "Describe metallic bonding as the electrostatic attraction between the positive ions in a giant metallic lattice and a 'sea' of delocalised electrons", isSupplement: true },
                            { name: 'Explain in terms of structure and bonding the properties of metals: (a) good electrical conductivity, (b) malleability and ductility', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'Stoichiometry',
                subTopics: [
                    {
                        name: 'Formulae',
                        indicators: [
                            { name: 'State the formulae of the elements and compounds named in the subject content' },
                            { name: 'Define the molecular formula of a compound as the number and type of different atoms in one molecule' },
                            { name: 'Deduce the formula of a simple compound from the relative numbers of atoms present in a model or a diagrammatic representation' },
                            { name: 'Construct word equations and symbol equations to show how reactants form products, including state symbols' },
                            { name: 'Define the empirical formula of a compound as the simplest whole number ratio of the different atoms or ions in a compound', isSupplement: true },
                            { name: 'Deduce the formula of an ionic compound from the relative numbers of the ions present in a model or a diagrammatic representation or from the charges on the ions', isSupplement: true },
                            { name: 'Construct symbol equations with state symbols, including ionic equations', isSupplement: true },
                            { name: 'Deduce the symbol equation with state symbols for a chemical reaction, given relevant information', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Relative masses of atoms and molecules',
                        indicators: [
                            { name: 'Describe relative atomic mass, Ar, as the average mass of the isotopes of an element compared to 1/12th of the mass of an atom of ¹²C' },
                            { name: 'Define relative molecular mass, Mr, as the sum of the relative atomic masses. Relative formula mass, Mr, will be used for ionic compounds' },
                            { name: 'Calculate reacting masses in simple proportions. Calculations will not involve the mole concept' },
                        ],
                    },
                    {
                        name: 'The mole and the Avogadro constant',
                        indicators: [
                            { name: 'State that concentration can be measured in g/dm³ or mol/dm³' },
                            { name: 'State that the mole, mol, is the unit of amount of substance and that one mole contains 6.02 × 10²³ particles, e.g. atoms, ions, molecules; this number is the Avogadro constant', isSupplement: true },
                            { name: 'Use the relationship amount of substance (mol) = mass (g) / molar mass (g/mol) to calculate: (a) amount of substance, (b) mass, (c) molar mass, (d) relative atomic mass or relative molecular/formula mass, (e) number of particles, using the value of the Avogadro constant', isSupplement: true },
                            { name: 'Use the molar gas volume, taken as 24 dm³ at room temperature and pressure, r.t.p., in calculations involving gases', isSupplement: true },
                            { name: 'Calculate stoichiometric reacting masses, limiting reactants, volumes of gases at r.t.p., volumes of solutions and concentrations of solutions expressed in g/dm³ and mol/dm³, including conversion between cm³ and dm³', isSupplement: true },
                            { name: 'Use experimental data from a titration to calculate the moles of solute, or the concentration or volume of a solution', isSupplement: true },
                            { name: 'Calculate empirical formulae and molecular formulae, given appropriate data', isSupplement: true },
                            { name: 'Calculate percentage yield, percentage composition by mass and percentage purity, given appropriate data', isSupplement: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Physical Chemistry',
        icon: <ReactionIcon />,
        topics: [
            {
                name: 'Electrochemistry',
                subTopics: [
                    {
                        name: 'Electrolysis',
                        indicators: [
                            { name: 'Define electrolysis as the decomposition of an ionic compound, when molten or in aqueous solution, by the passage of an electric current' },
                            { name: 'Identify in simple electrolytic cells: (a) the anode as the positive electrode, (b) the cathode as the negative electrode, (c) the electrolyte as the molten or aqueous substance that undergoes electrolysis' },
                            { name: 'Identify the products formed at the electrodes and describe the observations made during the electrolysis of: (a) molten lead(II) bromide, (b) concentrated aqueous sodium chloride, (c) dilute sulfuric acid, using inert electrodes made of platinum or carbon/graphite' },
                            { name: 'State that metals or hydrogen are formed at the cathode and that non-metals (other than hydrogen) are formed at the anode' },
                            { name: 'Predict the identity of the products at each electrode for the electrolysis of a binary compound in the molten state' },
                            { name: 'State that metal objects are electroplated to improve their appearance and resistance to corrosion' },
                            { name: 'Describe how metals are electroplated' },
                            { name: 'Describe the transfer of charge during electrolysis to include: (a) the movement of electrons in the external circuit, (b) the loss or gain of electrons at the electrodes, (c) the movement of ions in the electrolyte', isSupplement: true },
                            { name: 'Identify the products formed at the electrodes and describe the observations made during the electrolysis of aqueous copper(II) sulfate using inert carbon/graphite electrodes and when using copper electrodes', isSupplement: true },
                            { name: 'Predict the identity of the products at each electrode for the electrolysis of a halide compound in dilute or concentrated aqueous solution', isSupplement: true },
                            { name: 'Construct ionic half-equations for reactions at the anode (to show oxidation) and at the cathode (to show reduction)', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Hydrogen–oxygen fuel cells',
                        indicators: [
                            { name: 'State that a hydrogen–oxygen fuel cell uses hydrogen and oxygen to produce electricity with water as the only chemical product' },
                            { name: 'Describe the advantages and disadvantages of using hydrogen–oxygen fuel cells in comparison with gasoline/petrol engines in vehicles', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'Chemical energetics',
                subTopics: [
                    {
                        name: 'Exothermic and endothermic reactions',
                        indicators: [
                            { name: 'State that an exothermic reaction transfers thermal energy to the surroundings leading to an increase in the temperature of the surroundings' },
                            { name: 'State that an endothermic reaction takes in thermal energy from the surroundings leading to a decrease in the temperature of the surroundings' },
                            { name: 'Interpret reaction pathway diagrams showing exothermic and endothermic reactions' },
                            { name: 'State that the transfer of thermal energy during a reaction is called the enthalpy change, ΔH, of the reaction. ΔH is negative for exothermic reactions and positive for endothermic reactions', isSupplement: true },
                            { name: 'Define activation energy, Ea, as the minimum energy that colliding particles must have to react', isSupplement: true },
                            { name: 'Draw and label reaction pathway diagrams for exothermic and endothermic reactions using information provided, to include: (a) reactants, (b) products, (c) enthalpy change of the reaction, ΔH, (d) activation energy, Ea', isSupplement: true },
                            { name: 'State that bond breaking is an endothermic process and bond making is an exothermic process and explain the enthalpy change of a reaction in terms of bond breaking and bond making', isSupplement: true },
                            { name: 'Calculate the enthalpy change of a reaction using bond energies', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'Chemical reactions',
                subTopics: [
                    { name: 'Physical and chemical changes', indicators: [{ name: 'Identify physical and chemical changes, and describe the differences between them' }] },
                    {
                        name: 'Rate of reaction',
                        indicators: [
                            { name: 'Describe the effect on the rate of reaction of: (a) changing the concentration of solutions, (b) changing the pressure of gases, (c) changing the surface area of solids, (d) changing the temperature, (e) adding or removing a catalyst, including enzymes' },
                            { name: 'State that a catalyst increases the rate of a reaction and is unchanged at the end of a reaction' },
                            { name: 'Describe practical methods for investigating the rate of a reaction including change in mass of a reactant or a product and the formation of a gas' },
                            { name: 'Interpret data, including graphs, from rate of reaction experiments' },
                            { name: 'Describe collision theory in terms of: (a) number of particles per unit volume, (b) frequency of collisions between particles, (c) kinetic energy of particles, (d) activation energy, Ea', isSupplement: true },
                            { name: 'Describe and explain the effect on the rate of reaction of: (a) changing the concentration of solutions, (b) changing the pressure of gases, (c) changing the surface area of solids, (d) changing the temperature, (e) adding or removing a catalyst, including enzymes using collision theory', isSupplement: true },
                            { name: 'State that a catalyst decreases the activation energy, Ea, of a reaction', isSupplement: true },
                            { name: 'Evaluate practical methods for investigating the rate of a reaction including change in mass of a reactant or a product and the formation of a gas', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Reversible reactions and equilibrium',
                        indicators: [
                            { name: 'State that some chemical reactions are reversible as shown by the symbol ⇌' },
                            { name: 'Describe how changing the conditions can change the direction of a reversible reaction for: (a) the effect of heat on hydrated compounds, (b) the addition of water to anhydrous compounds, limited to copper(II) sulfate and cobalt(II) chloride' },
                            { name: 'State that a reversible reaction in a closed system is at equilibrium when: (a) the rate of the forward reaction is equal to the rate of the reverse reaction, (b) the concentrations of reactants and products are no longer changing', isSupplement: true },
                            { name: 'Predict and explain, for a reversible reaction, how the position of equilibrium is affected by: (a) changing temperature, (b) changing pressure, (c) changing concentration, (d) using a catalyst, using information provided', isSupplement: true },
                            { name: 'State the symbol equation for the production of ammonia in the Haber process, N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', isSupplement: true },
                            { name: 'State the sources of the hydrogen (methane) and nitrogen (air) in the Haber process', isSupplement: true },
                            { name: 'State the typical conditions in the Haber process as 450°C, 20000kPa/200atm and an iron catalyst', isSupplement: true },
                            { name: 'State the symbol equation for the conversion of sulfur dioxide to sulfur trioxide in the Contact process, 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', isSupplement: true },
                            { name: 'State the sources of the sulfur dioxide (burning sulfur or roasting sulfide ores) and oxygen (air) in the Contact process', isSupplement: true },
                            { name: 'State the typical conditions for the conversion of sulfur dioxide to sulfur trioxide in the Contact process as 450°C, 200kPa/2atm and a vanadium(V) oxide catalyst', isSupplement: true },
                            { name: 'Explain, in terms of rate of reaction and position of equilibrium, why the typical conditions stated are used in the Haber process and in the Contact process, including safety considerations and economics', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Redox',
                        indicators: [
                            { name: 'Use a Roman numeral to indicate the oxidation number of an element in a compound' },
                            { name: 'Define redox reactions as involving simultaneous oxidation and reduction' },
                            { name: 'Define oxidation as gain of oxygen and reduction as loss of oxygen' },
                            { name: 'Identify redox reactions as reactions involving gain and loss of oxygen' },
                            { name: 'Identify oxidation and reduction in redox reactions' },
                            { name: 'Define oxidation in terms of: (a) loss of electrons, (b) an increase in oxidation number', isSupplement: true },
                            { name: 'Define reduction in terms of: (a) gain of electrons, (b) a decrease in oxidation number', isSupplement: true },
                            { name: 'Identify redox reactions as reactions involving gain and loss of electrons', isSupplement: true },
                            { name: 'Identify redox reactions by changes in oxidation number using: (a) the oxidation number of elements in their uncombined state is zero, (b) the oxidation number of a monatomic ion is the same as the charge on the ion, (c) the sum of the oxidation numbers in a compound is zero, (d) the sum of the oxidation numbers in an ion is equal to the charge on the ion', isSupplement: true },
                            { name: 'Identify redox reactions by the colour changes involved when using acidified aqueous potassium manganate(VII) or aqueous potassium iodide', isSupplement: true },
                            { name: 'Define an oxidising agent as a substance that oxidises another substance and is itself reduced', isSupplement: true },
                            { name: 'Define a reducing agent as a substance that reduces another substance and is itself oxidised', isSupplement: true },
                            { name: 'Identify oxidising agents and reducing agents in redox reactions', isSupplement: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Inorganic Chemistry',
        icon: <PeriodicTableIcon />,
        topics: [
            {
                name: 'Acids, bases and salts',
                subTopics: [
                    {
                        name: 'The characteristic properties of acids and bases',
                        indicators: [
                            { name: 'Describe the characteristic properties of acids in terms of their reactions with: (a) metals, (b) bases, (c) carbonates' },
                            { name: 'Describe acids in terms of their effect on: (a) litmus, (b) thymolphthalein, (c) methyl orange' },
                            { name: 'State that bases are oxides or hydroxides of metals and that alkalis are soluble bases' },
                            { name: 'Describe the characteristic properties of bases in terms of their reactions with: (a) acids, (b) ammonium salts' },
                            { name: 'Describe alkalis in terms of their effect on: (a) litmus, (b) thymolphthalein, (c) methyl orange' },
                            { name: 'State that aqueous solutions of acids contain H⁺ ions and aqueous solutions of alkalis contain OH⁻ ions' },
                            { name: 'Describe how to compare hydrogen ion concentration, neutrality, relative acidity and relative alkalinity in terms of colour and pH using universal indicator paper' },
                            { name: 'Describe the neutralisation reaction between an acid and an alkali to produce water, H⁺(aq) + OH⁻(aq) → H₂O(l)' },
                            { name: 'Define acids as proton donors and bases as proton acceptors', isSupplement: true },
                            { name: 'Define a strong acid as an acid that is completely dissociated in aqueous solution and a weak acid as an acid that is partially dissociated in aqueous solution', isSupplement: true },
                            { name: 'State that hydrochloric acid is a strong acid, as shown by the symbol equation, HCl(aq) → H⁺(aq) + Cl⁻(aq)', isSupplement: true },
                            { name: 'State that ethanoic acid is a weak acid, as shown by the symbol equation, CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Oxides',
                        indicators: [
                            { name: 'Classify oxides as acidic, including SO₂ and CO₂, or basic, including CuO and CaO, related to metallic and non-metallic character' },
                            { name: 'Describe amphoteric oxides as oxides that react with acids and with bases to produce a salt and water', isSupplement: true },
                            { name: 'Classify Al₂O₃ and ZnO as amphoteric oxides', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Preparation of salts',
                        indicators: [
                            { name: 'Describe the preparation, separation and purification of soluble salts by reaction of an acid with: (a) an alkali by titration, (b) excess metal, (c) excess insoluble base, (d) excess insoluble carbonate' },
                            { name: 'Describe the general solubility rules for salts: (a) sodium, potassium and ammonium salts are soluble, (b) nitrates are soluble, (c) chlorides are soluble, except lead and silver, (d) sulfates are soluble, except barium, calcium and lead, (e) carbonates are insoluble, except sodium, potassium and ammonium, (f) hydroxides are insoluble, except sodium, potassium, ammonium and calcium (partially)' },
                            { name: 'Define a hydrated substance as a substance that is chemically combined with water and an anhydrous substance as a substance containing no water' },
                            { name: 'Describe the preparation of insoluble salts by precipitation', isSupplement: true },
                            { name: 'Define the term water of crystallisation as the water molecules present in hydrated crystals, including CuSO₄•5H₂O and CoCl₂•6H₂O', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'The Periodic Table',
                subTopics: [
                    {
                        name: 'Arrangement of elements',
                        indicators: [
                            { name: 'Describe the Periodic Table as an arrangement of elements in periods and groups and in order of increasing proton number/atomic number' },
                            { name: 'Describe the change from metallic to non-metallic character across a period' },
                            { name: 'Describe the relationship between group number and the charge of the ions formed from elements in that group' },
                            { name: 'Explain similarities in the chemical properties of elements in the same group of the Periodic Table in terms of their electronic configuration' },
                            { name: 'Explain how the position of an element in the Periodic Table can be used to predict its properties' },
                            { name: 'Identify trends in groups, given information about the elements', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Group I properties',
                        indicators: [
                            { name: 'Describe the Group I alkali metals, lithium, sodium and potassium, as relatively soft metals with general trends down the group, limited to: (a) decreasing melting point, (b) increasing density, (c) increasing reactivity' },
                            { name: 'Predict the properties of other elements in Group I, given information about the elements' },
                        ],
                    },
                    {
                        name: 'Group VII properties',
                        indicators: [
                            { name: 'Describe the Group VII halogens, chlorine, bromine and iodine, as diatomic non-metals with general trends down the group, limited to: (a) increasing density, (b) decreasing reactivity' },
                            { name: 'State the appearance of the halogens at r.t.p. as: (a) chlorine, a pale yellow-green gas, (b) bromine, a red-brown liquid, (c) iodine, a grey-black solid' },
                            { name: 'Describe and explain the displacement reactions of halogens with other halide ions' },
                            { name: 'Predict the properties of other elements in Group VII, given information about the elements' },
                        ],
                    },
                    {
                        name: 'Transition elements',
                        indicators: [
                            { name: 'Describe the transition elements as metals that: (a) have high densities, (b) have high melting points, (c) form coloured compounds, (d) often act as catalysts as elements and in compounds' },
                            { name: 'Describe transition elements as having ions with variable oxidation numbers, including iron(II) and iron(III)', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Noble gases',
                        indicators: [{ name: 'Describe the Group VIII noble gases as unreactive, monatomic gases and explain this in terms of electronic configuration' }],
                    },
                ],
            },
            {
                name: 'Metals',
                subTopics: [
                    {
                        name: 'Properties of metals',
                        indicators: [
                            { name: 'Compare the general physical properties of metals and non-metals, including: (a) thermal conductivity, (b) electrical conductivity, (c) malleability and ductility, (d) melting points and boiling points' },
                            { name: 'Describe the general chemical properties of metals, limited to their reactions with: (a) dilute acids, (b) cold water and steam, (c) oxygen' },
                        ],
                    },
                    {
                        name: 'Uses of metals',
                        indicators: [
                            { name: 'Describe the uses of metals in terms of their physical properties, including: (a) aluminium in the manufacture of aircraft because of its low density, (b) aluminium in the manufacture of overhead electrical cables because of its low density and good electrical conductivity, (c) aluminium in food containers because of its resistance to corrosion, (d) copper in electrical wiring because of its good electrical conductivity and ductility' },
                        ],
                    },
                    {
                        name: 'Alloys and their properties',
                        indicators: [
                            { name: 'Describe an alloy as a mixture of a metal with other elements, including: (a) brass as a mixture of copper and zinc, (b) stainless steel as a mixture of iron and other elements such as chromium, nickel and carbon' },
                            { name: 'State that alloys can be harder and stronger than the pure metals and are more useful' },
                            { name: 'Describe the uses of alloys in terms of their physical properties, including stainless steel in cutlery because of its hardness and resistance to rusting' },
                            { name: 'Identify representations of alloys from diagrams of structure' },
                            { name: 'Explain in terms of structure how alloys can be harder and stronger than the pure metals because the different sized atoms in alloys mean the layers can no longer slide over each other', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Reactivity series',
                        indicators: [
                            { name: 'State the order of the reactivity series as: potassium, sodium, calcium, magnesium, aluminium, carbon, zinc, iron, hydrogen, copper, silver, gold' },
                            { name: 'Describe the reactions, if any, of: (a) potassium, sodium and calcium with cold water, (b) magnesium with steam, (c) magnesium, zinc, iron, copper, silver and gold with dilute hydrochloric acid and explain these reactions in terms of the position of the metals in the reactivity series' },
                            { name: 'Deduce an order of reactivity from a given set of experimental results' },
                            { name: 'Describe the relative reactivities of metals in terms of their tendency to form positive ions, by displacement reactions, if any, with the aqueous ions of magnesium, zinc, iron, copper and silver', isSupplement: true },
                            { name: 'Explain the apparent unreactivity of aluminium in terms of its oxide layer', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Corrosion of metals',
                        indicators: [
                            { name: 'State the conditions required for the rusting of iron and steel to form hydrated iron(III) oxide' },
                            { name: 'State some common barrier methods, including painting, greasing and coating with plastic' },
                            { name: 'Describe how barrier methods prevent rusting by excluding oxygen or water' },
                            { name: 'Describe the use of zinc in galvanising as an example of a barrier method and sacrificial protection', isSupplement: true },
                            { name: 'Explain sacrificial protection in terms of the reactivity series and in terms of electron loss', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Extraction of metals',
                        indicators: [
                            { name: 'Describe the ease in obtaining metals from their ores, related to the position of the metal in the reactivity series' },
                            { name: 'Describe the extraction of iron from hematite in the blast furnace, limited to: (a) the burning of carbon (coke) to provide heat and produce carbon dioxide, (b) the reduction of carbon dioxide to carbon monoxide, (c) the reduction of iron(III) oxide by carbon monoxide, (d) the thermal decomposition of calcium carbonate/limestone to produce calcium oxide, (e) the formation of slag. Symbol equations are not required' },
                            { name: 'State that the main ore of aluminium is bauxite and that aluminium is extracted by electrolysis' },
                            { name: 'State the symbol equations for the extraction of iron from hematite: (a) C + O₂ → CO₂, (b) C + CO₂ → 2CO, (c) Fe₂O₃ + 3CO → 2Fe + 3CO₂, (d) CaCO₃ → CaO + CO₂, (e) CaO + SiO₂ → CaSiO₃', isSupplement: true },
                            { name: 'Describe the extraction of aluminium from purified bauxite/aluminium oxide, including: (a) the role of cryolite, (b) why the carbon anodes need to be regularly replaced, (c) the reactions at the electrodes, including ionic half-equations. Details of the purification of bauxite are not required', isSupplement: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Organic & Environmental Chemistry',
        icon: <OrganicIcon />,
        topics: [
            {
                name: 'Chemistry of the environment',
                subTopics: [
                    {
                        name: 'Water',
                        indicators: [
                            { name: 'Describe chemical tests for the presence of water using anhydrous cobalt(II) chloride and anhydrous copper(II) sulfate' },
                            { name: 'Describe how to test for the purity of water using melting point and boiling point' },
                            { name: 'Explain that distilled water is used in practical chemistry rather than tap water because it contains fewer chemical impurities' },
                            { name: 'State that water from natural sources may contain substances, including: (a) dissolved oxygen, (b) metal compounds, (c) plastics, (d) sewage, (e) harmful microbes, (f) nitrates from fertilisers, (g) phosphates from fertilisers and detergents' },
                            { name: 'State that some of these substances are beneficial, including: (a) dissolved oxygen for aquatic life, (b) some metal compounds provide essential minerals for life' },
                            { name: 'State that some of these substances are potentially harmful, including: (a) some metal compounds are toxic, (b) some plastics harm aquatic life, (c) sewage contains harmful microbes which cause disease, (d) nitrates and phosphates lead to deoxygenation of water and damage to aquatic life. Details of the eutrophication process are not required' },
                            { name: 'Describe the treatment of the domestic water supply in terms of: (a) sedimentation and filtration to remove solids, (b) use of carbon to remove tastes and odours, (c) chlorination to kill microbes' },
                        ],
                    },
                    {
                        name: 'Fertilisers',
                        indicators: [
                            { name: 'State that ammonium salts and nitrates are used as fertilisers' },
                            { name: 'Describe the use of NPK fertilisers to provide the elements nitrogen, phosphorus and potassium for improved plant growth' },
                        ],
                    },
                    {
                        name: 'Air quality and climate',
                        indicators: [
                            { name: 'State the composition of clean, dry air as approximately 78% nitrogen, N₂, 21% oxygen, O₂ and the remainder as a mixture of noble gases and carbon dioxide, CO₂' },
                            { name: 'State the source of each of these air pollutants, limited to: (a) carbon dioxide from the complete combustion of carbon-containing fuels, (b) carbon monoxide and particulates from the incomplete combustion of carbon-containing fuels, (c) methane from the decomposition of vegetation and waste gases from digestion in animals, (d) oxides of nitrogen from car engines, (e) sulfur dioxide from the combustion of fossil fuels which contain sulfur compounds' },
                            { name: 'State the adverse effect of these air pollutants, limited to: (a) carbon dioxide: higher levels of carbon dioxide leading to increased global warming, which leads to climate change, (b) carbon monoxide: toxic gas, (c) particulates: increased risk of respiratory problems and cancer, (d) methane: higher levels of methane leading to increased global warming, which leads to climate change, (e) oxides of nitrogen: acid rain, photochemical smog and respiratory problems, (f) sulfur dioxide: acid rain' },
                            { name: 'State and explain strategies to reduce the effects of these environmental issues, limited to: (a) climate change: planting trees, reduction in livestock farming, decreasing use of fossil fuels, increasing use of hydrogen and renewable energy, e.g. wind, solar, (b) acid rain: use of catalytic converters in vehicles, reducing emissions of sulfur dioxide by using low-sulfur fuels and flue gas desulfurisation with calcium oxide' },
                            { name: 'Describe photosynthesis as the reaction between carbon dioxide and water to produce glucose and oxygen in the presence of chlorophyll and using energy from light' },
                            { name: 'State the word equation for photosynthesis, carbon dioxide + water → glucose + oxygen' },
                            { name: 'Describe how the greenhouse gases carbon dioxide and methane cause global warming, limited to: (a) the absorption, reflection and emission of thermal energy, (b) reducing thermal energy loss to space', isSupplement: true },
                            { name: 'Explain how oxides of nitrogen form in car engines and describe their removal by catalytic converters, e.g. 2CO + 2NO → 2CO₂ + N₂', isSupplement: true },
                            { name: 'State the symbol equation for photosynthesis, 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', isSupplement: true },
                        ],
                    },
                ],
            },
            {
                name: 'Organic chemistry',
                subTopics: [
                    {
                        name: 'Formulae, functional groups and terminology',
                        indicators: [
                            { name: 'Draw and interpret the displayed formula of a molecule to show all the atoms and all the bonds' },
                            { name: 'Write and interpret general formulae of compounds in the same homologous series, limited to: (a) alkanes, CnH2n+2, (b) alkenes, CnH2n, (c) alcohols, CnH2n+1OH, (d) carboxylic acids, CnH2n+1COOH' },
                            { name: 'Identify a functional group as an atom or group of atoms that determine the chemical properties of a homologous series' },
                            { name: 'State that a homologous series is a family of similar compounds with similar chemical properties due to the presence of the same functional group' },
                            { name: 'State that a saturated compound has molecules in which all carbon–carbon bonds are single bonds' },
                            { name: 'State that an unsaturated compound has molecules in which one or more carbon–carbon bonds are not single bonds' },
                            { name: 'State that a structural formula is an unambiguous description of the way the atoms in a molecule are arranged, including CH₂=CH₂, CH₃CH₂OH, CH₃COOCH₃', isSupplement: true },
                            { name: 'Define structural isomers as compounds with the same molecular formula, but different structural formulae, including C₄H₁₀ as CH₃CH₂CH₂CH₃ and CH₃CH(CH₃)CH₃ and C₄H₈ as CH₃CH₂CH=CH₂ and CH₃CH=CHCH₃', isSupplement: true },
                            { name: 'Describe the general characteristics of a homologous series as: (a) having the same functional group, (b) having the same general formula, (c) differing from one member to the next by a –CH₂– unit, (d) displaying a trend in physical properties, (e) sharing similar chemical properties', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Naming organic compounds',
                        indicators: [
                            { name: 'Name and draw the displayed formulae of: (a) methane and ethane, (b) ethene, (c) ethanol, (d) ethanoic acid, (e) the products of the reactions stated in sections 11.4–11.7' },
                            { name: 'State the type of compound present, given a chemical name ending in -ane, -ene, -ol, or -oic acid or from a molecular formula or displayed formula' },
                            { name: 'Name and draw the structural and displayed formulae of unbranched: (a) alkanes, (b) alkenes, including but-1-ene and but-2-ene, (c) alcohols, including propan-1-ol, propan-2-ol, butan-1-ol and butan-2-ol, (d) carboxylic acids containing up to four carbon atoms per molecule', isSupplement: true },
                            { name: 'Name and draw the displayed formulae of the unbranched esters which can be made from unbranched alcohols and carboxylic acids, each containing up to four carbon atoms', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Fuels',
                        indicators: [
                            { name: 'Name the fossil fuels: coal, natural gas and petroleum' },
                            { name: 'Name methane as the main constituent of natural gas' },
                            { name: 'State that hydrocarbons are compounds that contain hydrogen and carbon only' },
                            { name: 'State that petroleum is a mixture of hydrocarbons' },
                            { name: 'Describe the separation of petroleum into useful fractions by fractional distillation' },
                            { name: 'Describe how the properties of fractions obtained from petroleum change from the bottom to the top of the fractionating column, limited to: (a) decreasing chain length, (b) higher volatility, (c) lower boiling points, (d) lower viscosity' },
                            { name: 'Name the uses of the fractions as: (a) refinery gas fraction for gas used in heating and cooking, (b) gasoline/petrol fraction for fuel used in cars, (c) naphtha fraction as a chemical feedstock, (d) kerosene/paraffin fraction for jet fuel, (e) diesel oil/gas oil fraction for fuel used in diesel engines, (f) fuel oil fraction for fuel used in ships and home heating systems, (g) lubricating oil fraction for lubricants, waxes and polishes, (h) bitumen fraction for making roads' },
                        ],
                    },
                    {
                        name: 'Alkanes',
                        indicators: [
                            { name: 'State that the bonding in alkanes is single covalent and that alkanes are saturated hydrocarbons' },
                            { name: 'Describe the properties of alkanes as being generally unreactive, except in terms of combustion and substitution by chlorine' },
                            { name: 'State that in a substitution reaction one atom or group of atoms is replaced by another atom or group of atoms', isSupplement: true },
                            { name: 'Describe the substitution reaction of alkanes with chlorine as a photochemical reaction, with ultraviolet light providing the activation energy, Ea, and draw the structural or displayed formulae of the products, limited to monosubstitution', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Alkenes',
                        indicators: [
                            { name: 'State that the bonding in alkenes includes a double carbon–carbon covalent bond and that alkenes are unsaturated hydrocarbons' },
                            { name: 'Describe the manufacture of alkenes and hydrogen by the cracking of larger alkane molecules using a high temperature and a catalyst' },
                            { name: 'Describe the reasons for the cracking of larger alkane molecules' },
                            { name: 'Describe the test to distinguish between saturated and unsaturated hydrocarbons by their reaction with aqueous bromine' },
                            { name: 'State that in an addition reaction only one product is formed', isSupplement: true },
                            { name: 'Describe the properties of alkenes in terms of addition reactions with: (a) bromine or aqueous bromine, (b) hydrogen in the presence of a nickel catalyst, (c) steam in the presence of an acid catalyst and draw the structural or displayed formulae of the products', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Alcohols',
                        indicators: [
                            { name: 'Describe the manufacture of ethanol by: (a) fermentation of aqueous glucose at 25–35°C in the presence of yeast and in the absence of oxygen, (b) catalytic addition of steam to ethene at 300°C and 6000kPa/60atm in the presence of an acid catalyst' },
                            { name: 'Describe the combustion of ethanol' },
                            { name: 'State the uses of ethanol as: (a) a solvent, (b) a fuel' },
                            { name: 'Describe the advantages and disadvantages of the manufacture of ethanol by: (a) fermentation, (b) catalytic addition of steam to ethene', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Carboxylic acids',
                        indicators: [
                            { name: 'Describe the reaction of ethanoic acid with: (a) metals, (b) bases, (c) carbonates, including names and formulae of the salts produced' },
                            { name: 'Describe the formation of ethanoic acid by the oxidation of ethanol: (a) with acidified aqueous potassium manganate(VII), (b) by bacterial oxidation during vinegar production', isSupplement: true },
                            { name: 'Describe the reaction of a carboxylic acid with an alcohol using an acid catalyst to form an ester', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Polymers',
                        indicators: [
                            { name: 'Define polymers as large molecules built up from many smaller molecules called monomers' },
                            { name: 'Describe the formation of poly(ethene) as an example of addition polymerisation using ethene monomers' },
                            { name: 'State that plastics are made from polymers' },
                            { name: 'Describe how the properties of plastics have implications for their disposal' },
                            { name: 'Describe the environmental challenges caused by plastics, limited to: (a) disposal in landfill sites, (b) accumulation in oceans, (c) formation of toxic gases from burning' },
                            { name: 'Identify the repeat units and/or linkages in addition polymers and in condensation polymers', isSupplement: true },
                            { name: 'Deduce the structure or repeat unit of an addition polymer from a given alkene and vice versa', isSupplement: true },
                            { name: 'Deduce the structure or repeat unit of a condensation polymer from given monomers and vice versa, limited to: (a) polyamides from a dicarboxylic acid and a diamine, (b) polyesters from a dicarboxylic acid and a diol', isSupplement: true },
                            { name: 'Describe the differences between addition and condensation polymerisation', isSupplement: true },
                            { name: 'Describe and draw the structure of: (a) nylon, a polyamide, (b) PET, a polyester. The full name for PET, polyethylene terephthalate, is not required', isSupplement: true },
                            { name: 'State that PET can be converted back into monomers and re-polymerised', isSupplement: true },
                            { name: 'Describe proteins as natural polyamides and that they are formed from amino acid monomers with the general structure where R represents different types of side-chain', isSupplement: true },
                            { name: 'Describe and draw the structure of proteins', isSupplement: true },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Experimental Chemistry',
        icon: <ExperimentIcon />,
        topics: [
            {
                name: 'Experimental techniques and chemical analysis',
                subTopics: [
                    {
                        name: 'Experimental design',
                        indicators: [
                            { name: 'Name appropriate apparatus for the measurement of time, temperature, mass and volume, including: (a) stop-watches, (b) thermometers, (c) balances, (d) burettes, (e) volumetric pipettes, (f) measuring cylinders, (g) gas syringes' },
                            { name: 'Suggest advantages and disadvantages of experimental methods and apparatus' },
                            { name: 'Describe a: (a) solvent as a substance that dissolves a solute, (b) solute as a substance that is dissolved in a solvent, (c) solution as a mixture of one or more solutes dissolved in a solvent, (d) saturated solution as a solution containing the maximum concentration of a solute dissolved in the solvent at a specified temperature, (e) residue as a substance that remains after evaporation, distillation, filtration or any similar process, (f) filtrate as a liquid or solution that has passed through a filter' },
                        ],
                    },
                    {
                        name: 'Acid–base titrations',
                        indicators: [
                            { name: 'Describe an acid–base titration to include the use of a: (a) burette, (b) volumetric pipette, (c) suitable indicator' },
                            { name: 'Describe how to identify the end-point of a titration using an indicator' },
                        ],
                    },
                    {
                        name: 'Chromatography',
                        indicators: [
                            { name: 'Describe how paper chromatography is used to separate mixtures of soluble coloured substances, using a suitable solvent' },
                            { name: 'Interpret simple chromatograms to identify: (a) unknown substances by comparison with known substances, (b) pure and impure substances' },
                            { name: 'Describe how paper chromatography is used to separate mixtures of soluble colourless substances, using a suitable solvent and a locating agent. Knowledge of specific locating agents is not required', isSupplement: true },
                            { name: 'State and use the equation for Rf: Rf = distance travelled by substance / distance travelled by solvent', isSupplement: true },
                        ],
                    },
                    {
                        name: 'Separation and purification',
                        indicators: [
                            { name: 'Describe and explain methods of separation and purification using: (a) a suitable solvent, (b) filtration, (c) crystallisation, (d) simple distillation, (e) fractional distillation' },
                            { name: 'Suggest suitable separation and purification techniques, given information about the substances involved' },
                            { name: 'Identify substances and assess their purity using melting point and boiling point information' },
                        ],
                    },
                    {
                        name: 'Identification of ions and gases',
                        indicators: [
                            { name: 'Describe tests to identify the anions: (a) carbonate, CO₃²⁻, by reaction with dilute acid and then testing for carbon dioxide gas, (b) chloride, Cl⁻, bromide, Br⁻, and iodide, I⁻, by acidifying with dilute nitric acid then adding aqueous silver nitrate, (c) nitrate, NO₃⁻, reduction with aluminium foil and aqueous sodium hydroxide and then testing for ammonia gas, (d) sulfate, SO₄²⁻, by acidifying with dilute nitric acid and then adding aqueous barium nitrate, (e) sulfite, SO₃²⁻, by reaction with acidified aqueous potassium manganate(VII)' },
                            { name: 'Describe tests using aqueous sodium hydroxide and aqueous ammonia to identify the aqueous cations: (a) aluminium, Al³⁺, (b) ammonium, NH₄⁺, (c) calcium, Ca²⁺, (d) chromium(III), Cr³⁺, (e) copper(II), Cu²⁺, (f) iron(II), Fe²⁺, (g) iron(III), Fe³⁺, (h) zinc, Zn²⁺' },
                            { name: 'Describe tests to identify the gases: (a) ammonia, NH₃, using damp red litmus paper, (b) carbon dioxide, CO₂, using limewater, (c) chlorine, Cl₂, using damp litmus paper, (d) hydrogen, H₂, using a lighted splint, (e) oxygen, O₂, using a glowing splint, (f) sulfur dioxide, SO₂, using acidified aqueous potassium manganate(VII)' },
                            { name: 'Describe the use of a flame test to identify the cations: (a) lithium, Li⁺, (b) sodium, Na⁺, (c) potassium, K⁺, (d) calcium, Ca²⁺, (e) barium, Ba²⁺, (f) copper(II), Cu²⁺' },
                        ],
                    },
                ],
            },
        ],
    },
];


export const PHYSICS_HELPER_MESSAGES = [
    "Practice makes perfect! Try a solo quiz to sharpen your skills.",
    "Challenge a friend to a group quiz and see who's the real physics whiz!",
    "Feeling unsure about a topic? Head to the Quick Revision section for a refresher.",
    "Every great physicist started with the basics. Keep building your knowledge!",
    "Don't forget to check both Core and Extended syllabus options for a full workout.",
    "The universe is governed by the laws of physics. Let's explore them together!",
    "Stuck on a concept? Generating revision notes can provide a new perspective.",
    "A journey of a thousand miles begins with a single formula. Let's get started!"
];

export const MOTIVATIONAL_QUOTES = [
    "The expert in anything was once a beginner. Keep going!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "It does not matter how slowly you go as long as you do not stop."
];

export const LOADING_MESSAGES = [
    "Calibrating the flux capacitor...",
    "Reticulating splines...",
    "Consulting with Newton's ghost...",
    "Calculating escape velocity...",
    "Polishing the reflecting telescope...",
    "Warming up the Bunsen burner...",
    "Assembling molecules for your questions...",
    "Splitting atoms for a challenging quiz..."
];