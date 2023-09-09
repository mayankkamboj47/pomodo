Todo : 
1. Add intralist drag drop              DONE
    a. The droppable area should include the entire white space, or at least enough to drop DONE
2. Test the clock component (beep and all)                      DONE
3. Make everything look pretty                                  DONE
4. Add localStorage load and store, or use indexed DB           DONE
5. Make sure that the tilt doesn't correct itself when you click the thing. Diagnose where it comes from
    More information : 
        So when changing the layout, I added minwidth and maxwidth to the lists, alongside a flex-grow to
        fit the thing while being in contraints. Now, when I select a task, that list grows wide to its
        maximum width for some reason. Examining using inspect element, I see that the source code doesn't
        stir. This means that its all redrawing logic, because we've overcomplicated things. 
6. Test the components                                  Todo
    a. UserEvent is not working, but fireEvent is. Why?        toDO (after this all the tests are good as done)
7. Make the tilt slightly more subtle                   DONE
8. Bug : When you add the lists fast enough, or the tasks fast enough, two with the same id are added, and that really
   messes things up. Is there a way to avoid this ?
        One strategy : choose the time added at as id.                  FIXED YAY