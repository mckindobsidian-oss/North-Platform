import { describe,it,expect,afterEach,vi } from 'vitest'
import { render,screen,fireEvent,cleanup,act } from '@testing-library/react'
import App from '../App'
import { detectPlatform } from '../Landing'
afterEach(()=>{cleanup();vi.useRealTimers()})
describe('North website',()=>{
 it('detects browser and platform without confusing Edge with Chrome',()=>{
 expect(detectPlatform('Windows Chrome/120 Edg/120')).toEqual({os:'Windows',browser:'Edge'})
 expect(detectPlatform('iPhone Safari/604')).toEqual({os:'iOS',browser:'Safari'})
 expect(detectPlatform('Android Chrome/120')).toEqual({os:'Android',browser:'Chrome'})
 expect(detectPlatform('unknown')).toEqual({os:'your device',browser:'your browser'})
 })
 it('runs, pauses, and resets the focus preview',()=>{
 vi.useFakeTimers();render(<App/>);fireEvent.click(screen.getByRole('button',{name:'Start focusing'}));act(()=>vi.advanceTimersByTime(2000));expect(document.querySelector('.clock')?.textContent).toBe('24:58');fireEvent.click(screen.getByRole('button',{name:'Pause'}));act(()=>vi.advanceTimersByTime(2000));expect(document.querySelector('.clock')?.textContent).toBe('24:58');fireEvent.click(screen.getByLabelText('Reset timer'));expect(document.querySelector('.clock')?.textContent).toBe('25:00')
 })
 it('adds tasks and honestly labels downloads',()=>{
 render(<App/>);fireEvent.change(screen.getByLabelText('Add a task'),{target:{value:'Write a chapter'}});fireEvent.submit(screen.getByLabelText('Add a task').closest('form')!);expect(screen.getByRole('button',{name:'Write a chapter'})).toHaveAttribute('aria-pressed','false');fireEvent.click(screen.getByRole('button',{name:'Write a chapter'}));expect(screen.getByRole('button',{name:'Write a chapter'})).toHaveAttribute('aria-pressed','true');expect(screen.getAllByRole('button',{name:'Coming soon'})).toHaveLength(4);fireEvent.click(screen.getAllByRole('button',{name:'Coming soon'})[0]);expect(screen.getByRole('status')).toHaveTextContent('isn’t a download available yet');fireEvent.click(screen.getByLabelText('dusk background'));expect(screen.getByLabelText('dusk background')).toHaveAttribute('aria-pressed','true')
 })
})
