Todo : 
1. Add intralist drag drop              DONE
    a. The droppable area should include the entire white space, or at least enough to drop DONE
2. Test the clock component (beep and all)                      DONE
3. Make everything look pretty                                  DONE
4. Add localStorage load and store, or use indexed DB           DONE
5. Make sure that the tilt doesn't correct itself when you click the thing. Diagnose where it comes from
    More information : 
        So w hen changing the layout, I added minwidth and maxwidth to the lists, alongside a flex-grow to
        fit the thing while being in contraints. Now, when I select a task, that list grows wide to its
        maximum width for some reason. Examining using inspect element, I see that the source code doesn't
        stir. This means that its all redrawing logic, because we've overcomplicated things. 

        More progress : We have a selectedTask null initially, and yet the clock starts. Why ? 
6. Test the components                                  Todo
    a. UserEvent is not working, but fireEvent is. Why?        toDO (after this all the tests are good as done)
7. Make the tilt slightly more subtle                   DONE
8. Bug : When you add the lists fast enough, or the tasks fast enough, two with the same id are added, and that really
   messes things up. Is there a way to avoid this ?
        One strategy : choose the time added at as id.                  FIXED YAY
9. On refreshing, something causes the elapsed time to change by itself.  FIXED, but in the wrong time
10. Put up an error boundary to display the error message as a modal or such        DONE
11. Make the list editing option wider
12. Make sure that if someone leaves the list or task empty, you can still edit it
13. Add a way of resetting the clock - it is annoying to not be able to do that. 
14. Make things factually correct - what's the 30 minute cake ? And just plain and factual, do not shout with
exclamations. 
15. Either make the dragging disappear when resizing textarea, or make the textarea unresizable.
16. Make the reset button pause the thing if it is running, or wait, maybe we can just change localStorage
to a false thing

Strategy : 
14, 11, 12, 16, 13, 15
All done

17. Space out the point emojis a little                 DONE
18. Add proper padding to the settings menu             DONE
19. Remove the '/'                                      DONE
19.1 Add labels for inputs left and right               DONE
20. Properly check that typescript is thoroughly used in the project            DONE
21. Add thorough unit tests
22. Add thorough integration tests in a separate folder, but do not provide puppeteer as a dependency - it is too big
23. Make sure the app resets even when the clock is running             DONE
24. On mobile, clicking and double clicking doesn't work - so it is impossible to edit the tasks. Surprisingly, drag and drop works perfectly. 
25. The 'x' button is the only ugly thing remaining. Do something about it.  