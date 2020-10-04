const EtchASketch = (() => {
    /// HTML ELEMENT VARIABLES ///
    const gameboard = document.getElementById('gameboard');
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const sixteenBtn = document.getElementById('sixteen-btn');
    const thirtyTwoBtn = document.getElementById('thirtyTwo-btn');

    /// GAME SETTING VARIABLES ///
    let color = document.getElementById('color');
    let dimensions = { row: null, col: null };

    /// ADD EVENT LISTENERS TO CONTROL BUTTONS ///
    function initializeControlButtons(){
        sixteenBtn.addEventListener('click', function(){
            /// TOGGLE ACTIVE CLASS ///
            sixteenBtn.classList.add('active');
            thirtyTwoBtn.classList.remove('active');

            /// UPDATE GAME DIMENSIONS ///
            dimensions = { row: 16, col: 16 };
        });

        thirtyTwoBtn.addEventListener('click', function(){
            /// TOGGLE ACTIVE CLASS ///
            sixteenBtn.classList.remove('active');
            thirtyTwoBtn.classList.add('active');

            /// UPDATE GAME DIMENSIONS ///
            dimensions = { row: 32, col: 32 };
        });

        startBtn.addEventListener('click', function(){
            generateBoard(dimensions.row, dimensions.col);

            addGridCellListeners();

            startGame();
        });

        restartBtn.addEventListener('click', function(){
            clearBoard();
            resetGame();
        });

    };

    /// HELPER FUNCTIONS ///
    function generateBoard(row, col){
        gameboard.style.setProperty('--grid-rows', row);
        gameboard.style.setProperty('--grid-cols', col);

        for(let i = 0; i < (row * col); i++){
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');

            gameboard.appendChild(gridCell);
        };
    };
    function startGame(){
        startBtn.classList.add('hide');
        restartBtn.classList.remove('hide');
    };
    function clearBoard(){
        while(gameboard.children.length > 0){
            gameboard.removeChild(gameboard.firstChild);
        };
    };
    function resetGame(){
        // Reset size buttons
        sixteenBtn.classList.remove('active');
        thirtyTwoBtn.classList.remove('active');

        // Hide the restart button and show the start button
        restartBtn.classList.add('hide');
        startBtn.classList.remove('hide');

        // Reset the dimensions
        dimensions = { row: null, col: null };
    };
    function addGridCellListeners(){
        let gridCells = document.getElementsByClassName('grid-cell');

        for(let i = 0; i < gridCells.length; i++){
            gridCells[i].addEventListener('mouseover', function(e){
                if(color.value === 'random'){
                    e.target.style.backgroundColor = generateRandomColor();
                };

                e.target.style.backgroundColor = color.value;

            });
        };
    };
    function generateRandomColor(){
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        return `rgb(${r}, ${g}, ${b})`;
    };

    return {
        init: () => {
            initializeControlButtons();
        },
    }

})();


EtchASketch.init();
