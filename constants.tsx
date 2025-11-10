import React from 'react';
import type { Category } from './types';

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

const CellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a5 5 0 01-4.9-4H4a8 8 0 0116 0h-.1a5 5 0 01-4.9 4H9z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const PlantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14A4 4 0 0012 18a4 4 0 004-4v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4v2z" transform="rotate(-45 12 12)" />
    </svg>
);

const HumanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const DnaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" transform="scale(0.8) translate(2,2)"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm12 0c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zM8 12h8" />
    </svg>
);

const EcologyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364-5.364l-.707.707M5.343 17.657l-.707.707m12.728 0l-.707-.707M5.343 6.343l-.707-.707" />
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
        name: 'Cell Biology & Organisation',
        icon: <CellIcon />,
        topics: [
            {
                name: 'Characteristics and classification of living organisms',
                indicators: [
                    { name: 'Describe the characteristics of living organisms (movement, respiration, sensitivity, growth, reproduction, excretion, nutrition)' },
                    { name: 'State that organisms can be classified into groups by the features that they share' },
                    { name: 'Describe a species as a group of organisms that can reproduce to produce fertile offspring' },
                    { name: 'Describe the binomial system of naming species' },
                    { name: 'Construct and use dichotomous keys' },
                    { name: 'Explain that classification systems aim to reflect evolutionary relationships', isSupplement: true },
                    { name: 'Explain that sequences of bases in DNA are used as a means of classification', isSupplement: true },
                    { name: 'State the main features of the five kingdoms: animal, plant, fungus, prokaryote, protoctist', isSupplement: true },
                    { name: 'State the features of viruses (protein coat and genetic material)', isSupplement: true }
                ]
            },
            {
                name: 'Organisation of the organism',
                indicators: [
                    { name: 'Describe and compare the structure of a plant cell and an animal cell' },
                    { name: 'Describe the structure of a bacterial cell' },
                    { name: 'Identify cell structures in diagrams and images' },
                    { name: 'Describe the functions of cell structures' },
                    { name: 'State that new cells are produced by division of existing cells' },
                    { name: 'State that specialised cells have specific functions (ciliated cells, root hair cells, palisade mesophyll cells, neurones, red blood cells, sperm and egg cells)' },
                    { name: 'Describe the meaning of cell, tissue, organ, organ system and organism' },
                    { name: 'State and use the formula: magnification = image size ÷ actual size' },
                    { name: 'Calculate magnification and size of biological specimens using millimetres' },
                    { name: 'Convert measurements between millimetres (mm) and micrometres (μm)', isSupplement: true }
                ]
            },
            {
                name: 'Movement into and out of cells',
                indicators: [
                    { name: 'Describe diffusion as the net movement of particles down a concentration gradient' },
                    { name: 'State that energy for diffusion comes from kinetic energy of random movement' },
                    { name: 'Describe the importance of diffusion of gases and solutes' },
                    { name: 'Investigate factors that influence diffusion (surface area, temperature, concentration gradient, distance)' },
                    { name: 'Describe the role of water as a solvent' },
                    { name: 'State that water diffuses through partially permeable membranes by osmosis' },
                    { name: 'Investigate and describe the effects on plant tissues of immersing them in solutions of different concentrations' },
                    { name: 'State that plants are supported by turgor pressure' },
                    { name: 'Describe osmosis in terms of water potential', isSupplement: true },
                    { name: 'Explain the effects on plant cells of immersing them in solutions of different concentrations (turgid, plasmolysis, flaccid)', isSupplement: true },
                    { name: 'Explain the importance of water potential in water uptake by organisms', isSupplement: true },
                    { name: 'Describe active transport as the movement of particles against a concentration gradient, using energy from respiration' },
                    { name: 'Explain the importance of active transport (e.g., ion uptake by root hairs)', isSupplement: true },
                    { name: 'State that protein carriers move molecules during active transport', isSupplement: true }
                ]
            },
            {
                name: 'Biological molecules',
                indicators: [
                    { name: 'List the chemical elements in carbohydrates, fats and proteins' },
                    { name: 'State that large molecules are made from smaller molecules (starch from glucose, proteins from amino acids, fats and oils from fatty acids and glycerol)' },
                    { name: 'Describe the use of tests for starch (iodine), reducing sugars (Benedict’s), proteins (biuret), and fats (ethanol emulsion)' },
                    { name: 'Describe the structure of a DNA molecule (two strands, double helix, bases A, T, C, G)', isSupplement: true }
                ]
            },
            {
                name: 'Enzymes',
                indicators: [
                    { name: 'Describe a catalyst as a substance that increases reaction rate and is not changed' },
                    { name: 'Describe enzymes as biological catalysts (proteins)' },
                    { name: 'Describe why enzymes are important for sustaining life' },
                    { name: 'Describe enzyme action (complementary shape of active site and substrate)' },
                    { name: 'Investigate and describe the effect of changes in temperature and pH on enzyme activity' },
                    { name: 'Explain enzyme action with reference to active site, enzyme-substrate complex', isSupplement: true },
                    { name: 'Explain the specificity of enzymes', isSupplement: true },
                    { name: 'Explain the effect of temperature on enzyme activity (kinetic energy, collisions, denaturation)', isSupplement: true },
                    { name: 'Explain the effect of pH on enzyme activity (shape, fit, denaturation)', isSupplement: true }
                ]
            }
        ]
    },
    {
        name: 'Plant Biology',
        icon: <PlantIcon />,
        topics: [
            {
                name: 'Plant nutrition',
                indicators: [
                    { name: 'Describe photosynthesis as the process of making carbohydrates from raw materials using light energy' },
                    { name: 'State the word equation for photosynthesis' },
                    { name: 'State that chlorophyll is a green pigment in chloroplasts' },
                    { name: 'State that chlorophyll transfers light energy into chemical energy' },
                    { name: 'Outline the use and storage of carbohydrates made in photosynthesis (starch, cellulose, glucose, sucrose, nectar)' },
                    { name: 'Explain the importance of nitrate ions and magnesium ions' },
                    { name: 'Investigate the need for chlorophyll, light and carbon dioxide for photosynthesis' },
                    { name: 'Investigate the effect of varying light intensity, CO2 concentration and temperature on the rate of photosynthesis' },
                    { name: 'State the balanced chemical equation for photosynthesis', isSupplement: true },
                    { name: 'Identify and explain the limiting factors of photosynthesis', isSupplement: true },
                    { name: 'Explain how leaf structures (large surface area, thinness) are adaptations for photosynthesis' },
                    { name: 'Identify structures in a dicotyledonous leaf' },
                    { name: 'Explain how leaf structures adapt leaves for photosynthesis' }
                ]
            },
            {
                name: 'Transport in plants',
                indicators: [
                    { name: 'State the functions of xylem and phloem' },
                    { name: 'Identify the position of xylem and phloem in roots, stems and leaves' },
                    { name: 'Relate the structure of xylem vessels to their function', isSupplement: true },
                    { name: 'Identify root hair cells and state their functions' },
                    { name: 'State that the large surface area of root hairs increases uptake of water and mineral ions' },
                    { name: 'Outline the pathway taken by water through the root, stem and leaf' },
                    { name: 'Describe transpiration as the loss of water vapour from leaves' },
                    { name: 'State that water evaporates from mesophyll cells and diffuses through stomata' },
                    { name: 'Investigate the effect of temperature and wind speed on transpiration rate' },
                    { name: 'Explain how water vapour loss is related to internal surface area and stomata', isSupplement: true },
                    { name: 'Explain the mechanism of water movement up the xylem (transpiration pull)', isSupplement: true },
                    { name: 'Explain the effects of temperature, wind speed and humidity on transpiration rate', isSupplement: true },
                    { name: 'Explain how and why wilting occurs', isSupplement: true },
                    { name: 'Describe translocation as the movement of sucrose and amino acids in phloem', isSupplement: true },
                    { name: 'Describe sources and sinks in translocation', isSupplement: true },
                    { name: 'Explain why parts of a plant may act as a source and a sink at different times', isSupplement: true }
                ]
            }
        ]
    },
    {
        name: 'Human Biology',
        icon: <HumanIcon />,
        topics: [
            {
                name: 'Human nutrition',
                indicators: [
                    { name: 'Describe what is meant by a balanced diet' },
                    { name: 'State dietary sources and importance of carbohydrates, fats, proteins, vitamins C and D, mineral ions (calcium, iron), fibre, water' },
                    { name: 'Identify main organs of the digestive system' },
                    { name: 'Describe the functions of the organs of the digestive system' },
                    { name: 'Describe physical and chemical digestion' },
                    { name: 'Describe the functions of enzymes in digestion (amylase, protease, lipase)' },
                    { name: 'Describe the functions of hydrochloric acid in the stomach' },
                    { name: 'State that the small intestine is where nutrients are absorbed' },
                    { name: 'Outline the role of bile in emulsifying fats', isSupplement: true },
                    { name: 'Describe the digestion of starch (amylase, maltase) and protein (pepsin, trypsin)', isSupplement: true },
                    { name: 'Explain the significance of villi and microvilli', isSupplement: true },
                    { name: 'Describe the structure of a villus and the roles of capillaries and lacteals', isSupplement: true }
                ]
            },
            {
                name: 'Transport in animals',
                indicators: [
                    { name: 'Describe the circulatory system' },
                    { name: 'Describe the single circulation of a fish', isSupplement: true },
                    { name: 'Describe the double circulation of a mammal and its advantages', isSupplement: true },
                    { name: 'Identify structures of the mammalian heart' },
                    { name: 'State that blood is pumped away from the heart in arteries and returns in veins' },
                    { name: 'Describe coronary heart disease and its risk factors' },
                    { name: 'Describe the structure of arteries, veins and capillaries' },
                    { name: 'List the components of blood (red blood cells, white blood cells, platelets, plasma)' },
                    { name: 'State the functions of blood components' },
                    { name: 'State the roles of blood clotting' },
                    { name: 'Explain how the structure of arteries and veins is related to blood pressure', isSupplement: true },
                    { name: 'Identify lymphocytes and phagocytes and state their functions', isSupplement: true },
                    { name: 'Describe the process of clotting (fibrinogen to fibrin)', isSupplement: true }
                ]
            },
            {
                name: 'Diseases and immunity',
                indicators: [
                    { name: 'Describe a pathogen as a disease-causing organism' },
                    { name: 'Describe a transmissible disease' },
                    { name: 'State that a pathogen is transmitted by direct or indirect contact' },
                    { name: 'Describe the body defences (skin, mucus, stomach acid, etc.)' },
                    { name: 'Explain the importance of hygiene and a clean water supply in controlling disease spread' },
                    { name: 'Describe active immunity', isSupplement: true },
                    { name: 'Describe antibodies and their role', isSupplement: true },
                    { name: 'Outline the process of vaccination', isSupplement: true },
                    { name: 'Explain the role of vaccination in controlling disease spread', isSupplement: true },
                    { name: 'Explain passive immunity', isSupplement: true }
                ]
            },
            {
                name: 'Gas exchange and Respiration',
                indicators: [
                    { name: 'Describe the features of gas exchange surfaces in humans' },
                    { name: 'Identify parts of the breathing system' },
                    { name: 'Investigate differences between inspired and expired air' },
                    { name: 'Investigate the effects of physical activity on breathing rate' },
                    { name: 'Explain the role of ribs, intercostal muscles and diaphragm in ventilation', isSupplement: true },
                    { name: 'Explain the link between physical activity and breathing rate (CO2 concentration)', isSupplement: true },
                    { name: 'State the uses of energy in living organisms' },
                    { name: 'Describe aerobic and anaerobic respiration' },
                    { name: 'State the word equations for aerobic and anaerobic respiration' },
                    { name: 'State the balanced chemical equations for aerobic and anaerobic respiration', isSupplement: true },
                    { name: 'State that lactic acid builds up during vigorous exercise causing an oxygen debt', isSupplement: true },
                    { name: 'Outline how the oxygen debt is removed after exercise', isSupplement: true }
                ]
            },
            {
                name: 'Excretion, Coordination and Response',
                indicators: [
                    { name: 'State that CO2 is excreted through the lungs, and urea and excess salts by the kidneys' },
                    { name: 'Identify organs of the urinary system' },
                    { name: 'Outline the structure and function of a nephron', isSupplement: true },
                    { name: 'Describe the role of the liver in assimilation of amino acids and formation of urea', isSupplement: true },
                    { name: 'Describe the mammalian nervous system (CNS and PNS)' },
                    { name: 'Describe a simple reflex arc and a reflex action' },
                    { name: 'Describe a synapse' },
                    { name: 'Describe the structure of a synapse and the events that occur there', isSupplement: true },
                    { name: 'Describe sense organs as groups of receptor cells' },
                    { name: 'Identify structures of the eye and their functions' },
                    { name: 'Explain the pupil reflex' },
                    { name: 'Explain accommodation to view near and distant objects', isSupplement: true },
                    { name: 'Describe a hormone' },
                    { name: 'Identify endocrine glands and the hormones they secrete' },
                    { name: 'Describe the effects of adrenaline' },
                    { name: 'Compare nervous and hormonal control' },
                    { name: 'Describe homeostasis' },
                    { name: 'Explain homeostatic control by negative feedback', isSupplement: true },
                    { name: 'Describe the control of blood glucose concentration (insulin and glucagon)', isSupplement: true },
                    { name: 'Describe gravitropism and phototropism' },
                    { name: 'Explain the role of auxin in controlling shoot growth', isSupplement: true }
                ]
            },
            {
                name: 'Reproduction',
                indicators: [
                    { name: 'Describe asexual and sexual reproduction' },
                    { name: 'Identify parts of an insect-pollinated flower' },
                    { name: 'Describe pollination, and distinguish between self- and cross-pollination', isSupplement: true },
                    { name: 'Describe fertilisation in plants' },
                    { name: 'Identify parts of the male and female reproductive systems' },
                    { name: 'Describe fertilisation in humans' },
                    { name: 'Explain adaptive features of sperm and egg cells' },
                    { name: 'Describe the function of the placenta and umbilical cord', isSupplement: true },
                    { name: 'Describe the roles of testosterone and oestrogen' },
                    { name: 'Describe the menstrual cycle' },
                    { name: 'Explain the role of hormones in controlling the menstrual cycle (FSH, LH, progesterone, oestrogen)', isSupplement: true },
                    { name: 'Describe a sexually transmitted infection (STI) and how its spread is controlled' }
                ]
            }
        ]
    },
    {
        name: 'Inheritance, Variation and Selection',
        icon: <DnaIcon />,
        topics: [
            {
                name: 'Inheritance',
                indicators: [
                    { name: 'State that chromosomes are made of DNA, which contains genes' },
                    { name: 'Define gene and allele' },
                    { name: 'Describe the inheritance of sex in humans (X and Y chromosomes)' },
                    { name: 'Explain that the sequence of bases in a gene determines the sequence of amino acids in a protein', isSupplement: true },
                    { name: 'Explain how a protein is made (mRNA, ribosomes)', isSupplement: true },
                    { name: 'Describe mitosis and its role in growth, repair, and asexual reproduction', isSupplement: true },
                    { name: 'Describe meiosis as a reduction division involved in the production of gametes', isSupplement: true },
                    { name: 'Describe inheritance and define genotype, phenotype, homozygous, heterozygous, dominant, and recessive' },
                    { name: 'Use genetic diagrams and Punnett squares to predict results of monohybrid crosses' },
                    { name: 'Explain how to use a test cross', isSupplement: true },
                    { name: 'Describe codominance and explain the inheritance of ABO blood groups', isSupplement: true },
                    { name: 'Describe a sex-linked characteristic', isSupplement: true }
                ]
            },
            {
                name: 'Variation and selection',
                indicators: [
                    { name: 'Describe variation as differences between individuals of the same species' },
                    { name: 'State the differences between continuous and discontinuous variation' },
                    { name: 'State that discontinuous variation is caused by genes only, and continuous variation by both genes and environment' },
                    { name: 'Describe mutation as genetic change' },
                    { name: 'Describe gene mutation as a random change in the base sequence of DNA', isSupplement: true },
                    { name: 'Describe an adaptive feature' },
                    { name: 'Explain the adaptive features of hydrophytes and xerophytes', isSupplement: true },
                    { name: 'Describe natural selection' },
                    { name: 'Describe selective breeding' },
                    { name: 'Describe adaptation as a process resulting from natural selection', isSupplement: true },
                    { name: 'Describe the development of antibiotic resistant bacteria as an example of natural selection', isSupplement: true },
                    { name: 'Outline the differences between natural and artificial selection', isSupplement: true }
                ]
            }
        ]
    },
    {
        name: 'Ecology & Biotechnology',
        icon: <EcologyIcon />,
        topics: [
            {
                name: 'Organisms and their environment',
                indicators: [
                    { name: 'State that the Sun is the principal source of energy for biological systems' },
                    { name: 'Describe the flow of energy through living organisms' },
                    { name: 'Describe food chains and food webs' },
                    { name: 'Describe producers and consumers (primary, secondary, tertiary)' },
                    { name: 'Draw and interpret pyramids of numbers and biomass' },
                    { name: 'Describe a trophic level' },
                    { name: 'Draw and interpret pyramids of energy', isSupplement: true },
                    { name: 'Explain why energy transfer between trophic levels is not efficient', isSupplement: true },
                    { name: 'Describe the carbon cycle' },
                    { name: 'Describe the nitrogen cycle', isSupplement: true },
                    { name: 'Describe populations, communities, and ecosystems' },
                    { name: 'Identify factors affecting population growth (food supply, competition, predation, disease)' },
                    { name: 'Interpret population growth curves' },
                    { name: 'Explain the factors that lead to each phase in the sigmoid curve of population growth', isSupplement: true }
                ]
            },
            {
                name: 'Human influences on ecosystems',
                indicators: [
                    { name: 'Describe how humans have increased food production' },
                    { name: 'Describe advantages and disadvantages of monocultures and intensive livestock production' },
                    { name: 'Describe biodiversity and reasons for habitat destruction' },
                    { name: 'Explain the undesirable effects of deforestation' },
                    { name: 'Describe the effects of untreated sewage and excess fertiliser on aquatic ecosystems' },
                    { name: 'Explain the process of eutrophication of water', isSupplement: true },
                    { name: 'Describe effects of non-biodegradable plastics' },
                    { name: 'Describe air pollution by methane and CO2 (greenhouse effect, climate change)' },
                    { name: 'Describe a sustainable resource' },
                    { name: 'Explain why organisms become endangered or extinct' },
                    { name: 'Describe how endangered species can be conserved (monitoring, education, captive breeding, seed banks)' },
                    { name: 'Explain how forests and fish stocks can be conserved', isSupplement: true }
                ]
            },
            {
                name: 'Biotechnology and genetic modification',
                indicators: [
                    { name: 'State that bacteria are useful in biotechnology' },
                    { name: 'Discuss why bacteria are useful in biotechnology and genetic modification', isSupplement: true },
                    { name: 'Describe the role of anaerobic respiration in yeast (biofuels, bread-making)' },
                    { name: 'Describe the use of pectinase in fruit juice production' },
                    { name: 'Explain the use of lactase to produce lactose-free milk', isSupplement: true },
                    { name: 'Describe how fermenters can be used for large-scale production', isSupplement: true },
                    { name: 'Describe genetic modification' },
                    { name: 'Outline the process of genetic modification using bacterial production of a human protein as an example', isSupplement: true },
                    { name: 'Outline examples of genetic modification (human proteins in bacteria, herbicide/insect resistance in crops)' },
                    { name: 'Discuss the advantages and disadvantages of genetically modifying crops', isSupplement: true }
                ]
            }
        ]
    }
];

export const SUBJECTS = {
    physics: PHYSICS_CATEGORIES,
    biology: BIOLOGY_CATEGORIES,
};


export const SCIENCE_HELPER_MESSAGES = [
    "Practice makes perfect! Try a solo quiz to sharpen your skills.",
    "Challenge a friend to a group quiz and see who's the real science whiz!",
    "Feeling unsure about a topic? Head to the Quick Revision section for a refresher.",
    "Every great scientist started with the basics. Keep building your knowledge!",
    "Don't forget to check both Core and Extended syllabus options for a full workout.",
    "The universe is full of wonders. Let's explore them together!",
    "Stuck on a concept? Generating revision notes can provide a new perspective.",
    "A journey of a thousand miles begins with a single concept. Let's get started!"
];

export const MOTIVATIONAL_QUOTES = [
    "The expert in anything was once a beginner. Keep going!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The secret of getting ahead is getting started.",
    "It does not matter how slowly you go as long as you do not stop."
];

export const LOADING_MESSAGES = [
    "Calibrating the microscope...",
    "Reticulating splines...",
    "Consulting with Darwin's ghost...",
    "Sequencing the genome for your questions...",
    "Polishing the reflecting telescope...",
    "Warming up the Bunsen burner...",
    "Assembling molecules for your questions...",
    "Splitting atoms for a challenging quiz..."
];