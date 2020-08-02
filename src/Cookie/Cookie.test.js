import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Cookie from './Cookie';
import { MemoryRouter } from 'react-router-dom';
// import { waitForElementToBeRemoved } from '@testing-library/dom'


describe('cookie', () => {
  let cookies;
  let handleOpenMock
  let handleUnmountMock
  beforeEach(() => {
    handleOpenMock = jest.fn();
    handleUnmountMock = jest.fn();

    cookies = [
      {
        fortune: {message: "Man is the head but woman turns it.", id: "5403c81dc2fea4020029ab59"},
        lesson: {english: "batteries", chinese: "电池", pronunciation: "diànchí"},
        lotto: {id: "001400490033005100010057", numbers: [14, 49, 33, 51, 1, 57]}
      }
    ]
  })
  it('should render 2 cookie images', () => {
    const { getAllByRole } = render(
      <Cookie/>
    );

    const cookieImage = getAllByRole('img');

    
    expect(cookieImage[0]).toBeInTheDocument();
    expect(cookieImage[1]).toBeInTheDocument();
  });
  it('should render cookie section', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Cookie />
      </MemoryRouter>
    );
    const cookieImage = getByTestId('WholeCookie');
    expect(cookieImage).toBeInTheDocument();
    
  })
  // myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
    
  it('should click cookie element, then it will be unmounted from the dom', async () => {
    const { getByTestId, queryByText} = render(
      <MemoryRouter>
        <Cookie
          handleCookieOpen={handleOpenMock.mockReturnValue(true)}
          handleCookieUnmount={handleUnmountMock.mockReturnValue(false)}
        />
      </MemoryRouter>
    );
    const cookieImage = getByTestId('WholeCookie');

    fireEvent.click(cookieImage);

    await expect(queryByText("left half of fortune cookie")).not.toBeInTheDocument();
  })
})