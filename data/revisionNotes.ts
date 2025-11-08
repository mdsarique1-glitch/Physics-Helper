import type { RevisionNote } from '../types';

/**
 * NOTE: For a production application, all revision notes would be pre-generated 
 * and stored here to ensure instant loading times and reduce API costs.
 * This file demonstrates the structure with the first topic fully generated.
 */
export const REVISION_NOTES: Record<string, RevisionNote[]> = {
  '1.1 Physical quantities and measurement techniques': [
    {
      subTopicHeading: 'Measuring Length, Volume & Time',
      points: [
        {
          description: '<ul><li><b>Length</b> is measured using a <b>ruler</b>, <b>metre rule</b>, or <b>tape measure</b>.</li><li>When measuring, ensure the eye is positioned perpendicularly to the scale (<b>line of sight</b>) to avoid <b>parallax error</b>.</li></ul>',
          formula: 'N/A',
          symbolExplanation: 'N/A',
          siUnit: 'metre (m)',
        },
        {
          description: '<ul><li>The <b>volume</b> of a liquid is measured using a <b>measuring cylinder</b>.</li><li>Read the scale at the bottom of the <b>meniscus</b> (the curved upper surface of the liquid) with the eye level to the surface.</li></ul>',
          formula: 'N/A',
          symbolExplanation: 'N/A',
          siUnit: 'cubic metre (m<sup>3</sup>) or litre (L)',
        },
        {
          description: '<ul><li><b>Time</b> intervals are measured using <b>clocks</b>, <b>stopwatches</b>, or <b>digital timers</b>, which offer higher precision.</li></ul>',
          formula: 'N/A',
          symbolExplanation: 'N/A',
          siUnit: 'second (s)',
        },
        {
          description: '<ul><li>To measure a very small distance (e.g., thickness of paper), measure a large number (e.g., 100 sheets) and divide by the number.</li><li>To measure a short time interval (e.g., the <b>period</b> of a pendulum), time a large number of oscillations (e.g., 20) and divide the total time by the number of oscillations. This reduces reaction time errors.</li></ul>',
          formula: 'Average Time Period, T = <sup>Total Time</sup>&frasl;<sub>Number of Oscillations</sub>',
          symbolExplanation: 'T = Time period',
          siUnit: 'second (s)',
        },
      ],
    },
    {
      subTopicHeading: 'Scalars and Vectors (Supplement)',
      points: [
        {
          description: '<ul><li>A <b>scalar</b> quantity has <b>magnitude (size) only</b>.</li><li>A <b>vector</b> quantity has both <b>magnitude and direction</b>.</li></ul>',
          formula: 'N/A',
          symbolExplanation: 'N/A',
          siUnit: 'N/A',
          tableData: {
            headers: ['Scalar Quantities', 'Vector Quantities'],
            rows: [
              ['Distance', 'Force'],
              ['Speed', 'Weight'],
              ['Time', 'Velocity'],
              ['Mass', 'Acceleration'],
              ['Energy', 'Momentum'],
              ['Temperature', 'Electric Field Strength'],
              ['N/A', 'Gravitational Field Strength'],
            ],
          },
        },
        {
          description: '<ul><li><b>(Supplement)</b> The <b>resultant</b> of two vectors can be found by adding them tip-to-tail.</li><li>For two vectors at <b>right angles</b>, the resultant can be found using <b>Pythagoras\' theorem</b> for the magnitude and trigonometry for the direction.</li></ul>',
          formula: 'R<sup>2</sup> = A<sup>2</sup> + B<sup>2</sup>',
          symbolExplanation: 'R = Resultant vector<br>A = Vector A<br>B = Vector B',
          siUnit: 'Depends on quantity',
        },
      ],
    },
  ],
  // Other topics would be pre-filled here...
};
