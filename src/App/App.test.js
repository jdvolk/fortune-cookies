import React from 'react';
import App from './App';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getOneCookie } from '../ApiCalls'
jest.mock("../ApiCalls");

describe('App', () => {
  let mockGetOneCookie;
  let mockGetAnotherCookie;
  let mockFailedRequest;
  beforeEach(() => {
    mockGetOneCookie = [
      {
        fortune: {message: "Man is the head but woman turns it.", id: "5403c81dc2fea4020029ab59"},
        lesson: {english: "batteries", chinese: "电池", pronunciation: "diànchí"},
        lotto: {id: "001400490033005100010057", numbers: [14, 49, 33, 51, 1, 57]}
      }
    ]
    
    mockGetAnotherCookie = [ 
      {
        fortune: {message: "You can/t put an old head on young shoulders", id: "5403c81dc2fea4020029ab59"},
        lesson: {english: '1,000,000,000,000', chinese: "一兆", pronunciation: "yī-zhào"},
        lotto: {id: "001400490033005100010057", numbers: [24,44,20,39,32,58]}
      }
    ]
    mockFailedRequest = {
      type: "cors", 
      url: "http://fortunecookieapi.herokuapp.com/v1/coockie?limit=1", 
      redirected: false, 
      status: 404, 
      ok: false, body: "error", 
      falsestatus: 404, 
      statusText: "Not Found", 
      type: "cors", 
      url: "http://fortunecookieapi.herokuapp.com/v1/coockie?limit=1" 
    }
  })
  it('should render button on page load', () => {
    const {  getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    expect(button).toBeInTheDocument();
  });
  it('should render click for cookie on page load', () => {
    const {  getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const cookieMessage = getByText('Press button for cookie', { exact: false })
    
    expect(cookieMessage).toBeInTheDocument();
  });

  it('should call getOneCookie on click of button', async () => {
    getOneCookie.mockResolvedValue(mockGetOneCookie);
    const {  getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    
    expect(button).toBeInTheDocument();

    expect(getOneCookie).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(getOneCookie).toHaveBeenCalledTimes(1);
  });

  it('should fetch cookie data on click of button then display cookie image', async () => {
    getOneCookie.mockResolvedValue(mockGetOneCookie);
    const {  getByRole, getByAltText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    await waitFor(() => {
      const cookieButton = getByTestId('WholeCookie');
      expect(cookieButton).toBeInTheDocument();
  
      const leftCookieImg = getByAltText("left half of fortune cookie");
      expect(leftCookieImg).toBeInTheDocument();

    })
  })

  it('should display fortune on click of cookie image', async () => {
    getOneCookie.mockResolvedValue(mockGetOneCookie);
    const {  getByRole, getByAltText, getByTestId, getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
    expect(cookiePaper).toBeInTheDocument();

    const fortuneText = getByText("Man is the head but woman turns it.")
    expect(fortuneText).toBeInTheDocument();

    const fortuneLabel = getByText("Fortune:", { exact: false });
    expect(fortuneLabel).toBeInTheDocument();

    const lottoText = getByText('14,49,33,51,1,57');
    expect(lottoText).toBeInTheDocument();
  })
  it('should display chinese lesson on click of cookie paper', async () => {
    getOneCookie.mockResolvedValue(mockGetOneCookie);
    const {  getByRole, getByAltText, getByTestId, getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
    expect(cookiePaper).toBeInTheDocument();

    fireEvent.click(cookiePaper);

    waitFor(() => {
      const lessonText = getByText("Learn Chinese:");
      const englishText = getByText("batteries");
      const chineseText = getByText("电池");
  
      expect(lessonText).toBeInTheDocument();
      expect(englishText).toBeInTheDocument();
      expect(chineseText).toBeInTheDocument();
    })

  })
  it('should display chinese lesson on click of cookie paper, then click again to reveal fortune', async () => {
    getOneCookie.mockResolvedValue(mockGetOneCookie);
    const {  getByRole, getByAltText, getByTestId, getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
    expect(cookiePaper).toBeInTheDocument();

    fireEvent.click(cookiePaper);

    waitFor(() => {
      const lessonText = getByText("Learn Chinese:");
      expect(lessonText).toBeInTheDocument();
    })

    fireEvent.click(cookiePaper);

    const fortuneText = getByText("Man is the head but woman turns it.")
    expect(fortuneText).toBeInTheDocument();

    const fortuneLabel = getByText("Fortune:", { exact: false });
    expect(fortuneLabel).toBeInTheDocument();

    const lottoText = getByText('14,49,33,51,1,57');
    expect(lottoText).toBeInTheDocument();
  })
  it('should fetch second cookie after clicking button', async () => {
    getOneCookie.mockResolvedValueOnce(mockGetOneCookie);
    const {  getByRole,  getByTestId, getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
    expect(cookiePaper).toBeInTheDocument();

    getOneCookie.mockResolvedValueOnce(mockGetAnotherCookie);

    fireEvent.click(cookiePaper);

    fireEvent.click(button);

    fireEvent.click(cookieButton);

    waitFor(() => {
      const fortuneText = getByText("You can/t put an old head on young shoulders", {exact: false});
      const lottoNumbers = getByText('24,44,20,39,32,58');
      expect(fortuneText).toBeInTheDocument();
      expect(lottoNumbers).toBeInTheDocument();
    })
  })
  it("should be able to view past cookies", async () => {
    const {  getByRole,  getByTestId, getAllByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>      
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
    expect(cookiePaper).toBeInTheDocument();

    getOneCookie.mockResolvedValueOnce(mockGetAnotherCookie);

    fireEvent.click(cookiePaper);

    fireEvent.click(button);

    fireEvent.click(cookieButton);

    const backButton = getByTestId('back-arrow');
    const frontButton = getByTestId('front-arrow');

    expect(backButton).toBeInTheDocument();
    expect(frontButton).toBeInTheDocument();

    fireEvent.click(backButton)

    const fortuneText = getByText("Man is the head but woman turns it.")
    expect(fortuneText).toBeInTheDocument();

    const fortuneLabel = getByText("Fortune:", { exact: false });
    expect(fortuneLabel).toBeInTheDocument();

    const lottoText = getByText('14,49,33,51,1,57');
    expect(lottoText).toBeInTheDocument();

  })
  it("should be able to go from past cookies to the current cookie", async () => {
    const {  getByRole,  getByTestId, getAllByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>      
    );
    const button =  getByRole('button');
    
    fireEvent.click(button);

    await waitFor(() => {
    });
    const cookieButton = getByTestId('WholeCookie');
    fireEvent.click(cookieButton);

    const cookiePaper = getAllByRole('button')[1];
  
    getOneCookie.mockResolvedValueOnce(mockGetAnotherCookie);

    fireEvent.click(cookiePaper);

    fireEvent.click(button);

    fireEvent.click(cookieButton);

    const backButton = getByTestId('back-arrow');
    const frontButton = getByTestId('front-arrow');

    expect(backButton).toBeInTheDocument();
    expect(frontButton).toBeInTheDocument();

    fireEvent.click(backButton);

    const fortuneText = getByText("Man is the head but woman turns it.")
    expect(fortuneText).toBeInTheDocument();

    fireEvent.click(frontButton);

    waitFor(() => {
      const fortuneText2 = getByText("You can/t put an old head on young shoulders", {exact: false});
      const lottoNumbers = getByText('24,44,20,39,32,58');
      expect(fortuneText2).toBeInTheDocument();
      expect(lottoNumbers).toBeInTheDocument();
    })
  })
  it('should render error on cookie paper if api request.status != 200', async () => {
    getOneCookie.mockResolvedValueOnce(mockFailedRequest);
    const {  getByRole,  getByTestId, getAllByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>      
    );
    
    const button =  getByRole('button');
    await fireEvent.click(button);

    await waitFor(() => {
      const cookieButton = getByTestId('WholeCookie');
      fireEvent.click(cookieButton);
      const errorMessage = getByText("Sorry!", {exact: false});
      expect(errorMessage).toBeInTheDocument();
    })
  })
  it('should reset to home page after click of error', async () => {
    getOneCookie.mockResolvedValueOnce(mockFailedRequest);
    const {  getByRole,  getByTestId, getAllByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>      
    );

    const button =  getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const cookieButton = getByTestId('WholeCookie');
      fireEvent.click(cookieButton);
      const errorMessage = getByText("Sorry!", {exact: false});
      fireEvent.click(errorMessage);
    
    })
    const clickMessage = getByText('Press button for cookie');
    expect(clickMessage).toBeInTheDocument();
  })
})