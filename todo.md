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
14, 11, 12, 16,13, 15
