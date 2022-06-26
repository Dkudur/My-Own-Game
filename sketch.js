var gamestate = "play"


function preload() {
    bgImg = loadImage("bg.jpg")
    tarzanImg = loadImage("tarzan.png")
    stoneImg = loadImage("stone-removebg-preview.png")
    foodImg = loadImage("food.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(width / 2, height / 2 - 200)
    bg.addImage(bgImg)
    bg.velocityX = -4
    bg.scale = 3.8

    tarzan = createSprite(120, height - 120)
    tarzan.addImage(tarzanImg)
    tarzan.scale = 0.8

    invGround = createSprite(width/2, height, width, 10)
    invGround.visible = false

    stonesGroup = createGroup()
    FoodGroup = createGroup()

}

function draw() {

    background("green")

    if (gamestate == "play") {
        if (bg.x < 0) {
            bg.x = width / 2
        }

        if (keyDown("UP_ARROW")) {
            tarzan.y = 110
            tarzan.velocityY = 5
        }

        if (tarzan.isTouching(stonesGroup)) {
            gamestate = "end"
        }

        spawnStones()
        spawnFood()

        invGround.collide(tarzan)


        if (FoodGroup.isTouching(tarzan)) {
            
            for (var i = 0; i < FoodGroup.length; i++) {

                if (FoodGroup[i].isTouching(tarzan)) {
                    FoodGroup[i].destroy()
                }
            }
        }

    }


    if (gamestate == "end") {
        stonesGroup.destroyEach()
        tarzan.destroy()
        bg.destroy()
        FoodGroup.destroyEach()

    }




    drawSprites()
}

function spawnStones() {

    if (frameCount % 60 == 0) {
        stone = createSprite(width, height - 50)
        stone.addImage(stoneImg)
        // tarzan.scale = 0.8
        stone.velocityX = -6
        stone.setCollider("rectangle", 0, 0, 100, 140)
        stonesGroup.add(stone)
    }
}

function spawnFood() {

    if (frameCount % 30 == 0) {
        Food = createSprite(width, round(random(50, 200)))
        Food.addImage(foodImg)
        Food.scale = 0.4
        Food.velocityX = -6

        Food.debug = true
        //Food.setCollider("rectangle", 0, 0, 100, 140)
        FoodGroup.add(Food)
    }
}