import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CookiePaper from './CookiePaper';
import { MemoryRouter } from 'react-router-dom';

describe('cookie paper', () => {
  let mockIsClicked
  let cookies;
  beforeEach(() => {
    mockIsClicked = jest.fn();
    cookies = [
      {
        fortune: {message: "Man is the head but woman turns it.", id: "5403c81dc2fea4020029ab59"},
        lesson: {english: "batteries", chinese: "电池", pronunciation: "diànchí"},
        lotto: {id: "001400490033005100010057", numbers: [14, 49, 33, 51, 1, 57]}
      }
    ]
  })
  it('should render cookie paper button', () => {
    const { getByRole } = render(
      <CookiePaper
        cookies={cookies}
        currentIndex={0}
      />
    );
    const CookiePaperButton = getByRole('button');
    expect(CookiePaperButton).toBeInTheDocument();
  })

  it('should render cookie cookie fortune and lucky numbers', () => {
    const { getByText } = render(
      <CookiePaper
        cookies={cookies}
        currentIndex={0}
      />
    );
    const cookieFortune = getByText('Man is the head but woman turns it.');
    const luckyNumbers = getByText("14,49,33,51,1,57", { exact: 'false' })

    expect(cookieFortune).toBeInTheDocument();
    expect(luckyNumbers).toBeInTheDocument();
  })

  it('should click cookie paper button to reveal chinese lesson', async () => {
    const { getByRole, getByText } = render(
      <CookiePaper
        cookies={cookies}
        isClicked={mockIsClicked}
        currentIndex={0}
      />
    );
    const CookiePaperButton = getByRole('button');
    expect(CookiePaperButton).toBeInTheDocument();

    
    fireEvent.click(CookiePaperButton);
    mockIsClicked.mockResolvedValue(true);
    
    const learnChinese = getByText('learn chinese', { exact: false })
    const englishLesson = getByText('batteries', {exact: false});
    const chineseLesson = getByText('电池');

    expect(learnChinese).toBeInTheDocument();
    expect(englishLesson).toBeInTheDocument();
    expect(chineseLesson).toBeInTheDocument();
  })
  it('should click cookie paper button to reveal chinese lesson, then click again to reveal fortune', async () => {
    const { getByRole, getByText } = render(
      <CookiePaper
        cookies={cookies}
        isClicked={mockIsClicked}
        currentIndex={0}
      />
    );
    const CookiePaperButton = getByRole('button');
    expect(CookiePaperButton).toBeInTheDocument();

    fireEvent.click(CookiePaperButton);
    mockIsClicked.mockResolvedValueOnce(true);
    
    const learnChinese = getByText('learn chinese', { exact: false })
    const englishLesson = getByText('batteries', {exact: false});
    const chineseLesson = getByText('电池');

    expect(learnChinese).toBeInTheDocument();
    expect(englishLesson).toBeInTheDocument();
    expect(chineseLesson).toBeInTheDocument();

    const CookiePaperButton2 = getByRole('button');
    fireEvent.click(CookiePaperButton2);
    mockIsClicked.mockResolvedValueOnce(false);

    waitFor(() => {
      const cookieFortune = getByText('Man is the head but woman turns it.');
      const luckyNumbers = getByText("14,49,33,51,1,57", { exact: 'false' })
      expect(cookieFortune).toBeInTheDocument();
      expect(luckyNumbers).toBeInTheDocument();
    })
  })
})