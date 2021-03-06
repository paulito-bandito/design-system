/* global driver */
import { ROOT_URL } from '../helpers/e2e/constants';

import assertNoAxeViolations from '../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.tooltip.tooltip/`;

describe('Tooltip component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    expect(await getElementByClassName('ds-c-tooltip__trigger')).toBeTruthy();
  });

  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
