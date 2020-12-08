using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Migrations
{
    public partial class MoreSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Name", "Quantity", "RecipeId", "UOMId" },
                values: new object[] { -78, "Chili Powder", 1m, -1, "tbsp" });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Name", "Notes" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"1. Preheat grill or broiler.
2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.
3. Lightly oil the grill or broiler rack (see Tip).
4. Season chicken with salt and grill or broil for 2 minutes.
5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.
6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer.", "Chipotle and Orange Grilled Chicken", @"* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.
* Look for the small cans with the Mexican foods in large supermarkets.
* Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.
* Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)
* When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
2. Place tortillas on a work surface.
3. Spread 1/2 cup filling on half of each tortilla.
4. Fold tortillas in half, pressing gently to flatten.
5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.
6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.
7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.
8. Serve the quesadillas with avocado and the remaining salsa." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"1. Cook Steak on BBQ
2. Cook Potatoes to personal preference
3. Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), @"1. Season Chicken with any desired spices
2. Cook Chicken
3. Cook Potatoes
4. Smother in Hot Sauce" });

            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "Id", "Carbohydrates", "CategoryId", "CookTime", "DateCreated", "DateModified", "Fat", "Image", "Instructions", "Name", "Notes", "PrepTime", "Protein", "Servings", "UserId" },
                values: new object[,]
                {
                    { -6, 13, -3, 45m, new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), 20, "images/User_927249ee-afd9-4bd0-b74e62053687d989/braz-fish-stew.jpg", @"1. Rinse and pat dry the fish and cut into 2 inch peices. Place in a bowl. Add salt, zest from half the lime and 1 tablespoon lime juice. Massage lightly to coat all pieces well. Set aside.
                2. In a large saute pan, heat the olive oil over medium high heat. Add onion and salt, and sauté 2-3 minutes. Turn heat down to medium, add carrot, bell pepper, garlic and jalapeno and cook 4-5 more minutes. Add tomato paste, spices and stock. Mix and bring to a simmer and add tomatoes. Cover and simmer gently on medium low for 5 mintues or until carrots are tender.
                3. Add the coconut milk and taste and add more salt if necessary.
                4. Nestle the fish in the stew and simmer gently until it’s cooked through, about 4-6 minutes.  Spoon the flavorful coconut broth over the fish and cook until desired doneness or longer for thicker pieces. ( You can also finish this in a 350F oven).
                5. Taste and adjust salt and squeeze with lime.
                6. To serve, serve over rice, sprinkle with cilantro or scallions and a squeeze of lime.
                7. (Optional) Drizzle with a little olive oil to taste.", "Brazilian Fish Stew (Moqueca)", @"* Serve with rice or crusty bread to mop up all the juices
                * Look for Coconut Milk in a can at the supermarket
                * Fresh Tomatoes make the recipe better than Canned Tomato
                * Cumin can be substituted for whole seed cumin", 30m, 45, 4, "927249ee-afd9-4bd0-b74e62053687d989" },
                    { -7, 21, -3, 20m, new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), 12, "images/User_927249ee-afd9-4bd0-b74e62053687d989/simple-salmon-chowder.jpg", @"1. Heat oil over medium heat, and saute onion, fennel and celery until fragrant, 5-6 minutes. Add garlic, fennel seeds, thyme and saute two more minutes, stirring. Add the smoked paprika.
                2. Add vermouth, and cook it off, about 1-2 minutes. Add stock, salt, thyme and bay, and bring to a simmer over high heat. Add potatoes and stir. Bring to a simmer, cover and simmer over med-low heat until tender, about 8-10 minutes (check at 7 mins, be careful to not overcook).  While this is cooking prep the salmon.
                3. Cut salmon into 2-inch pieces, removing any of the brown fat ( see notes) and bones. Sprinkle lightly with salt.
                4. Once the potatoes are just fork-tender, add the milk and bring to a low simmer (do not boil) and add the salmon, gently poaching it in the soup for just about  2 minutes. Turn heat off.  Fish will continue to cook. If you continue to simmer the soup any longer it may cause a slight curdling. ( Don’t worry, it’s still edible, but not as pretty.)  Flake the fish apart, into bite-sized pieces, with a fork.
                5. Taste, adjust seasonings to your liking and serve immediately.
                6. Garnish with fennel fronds, lemon wedges, fresh dill or tarragon.", "Simple Salmon Chowder", @"* If using chicken stock, add 1 teaspoon fish sauce for depth. You can also sub some clam juice for the stock.
                * If skipping the vermouth or sherry cooking wine, which FYI does give this a lovely elevated nuanced flavor, add a couple of drops of AC vinegar at the end along with a pinch of sugar. Advanced cooks- you could experiment with Pernod (subbing it for the vermouth, starting with 2-3 tablespoons, making sure to cook this off) which will give it a beautiful anise flavor.
                * If you notice grey/brown fat located between the skin and salmon flesh, feel free to remove it -which ultimately will look better in the stew. If using wild salmon, it is ok to eat (healthy, actually)  just not quite as “pretty”.
                * Keto option, sub potatoes with cauliflower. Use 1 cup of heavy whipping cream.
                * Dairy-Free option: Add 1 cup of coconut milk, more to taste.
                * Soup will keep 3 days in the fridge.
                * Salmon can be substituted for Cod or Shrimp. Cut in to 1-2 inch pieces
                * Garnish with Lemon Wedges, Fresh Dill, Tarragon, and Fennel Fronds if you desire.", 20m, 25, 6, "927249ee-afd9-4bd0-b74e62053687d989" },
                    { -8, 21, -2, 15m, new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), 12, "images/User_927249ee-afd9-4bd0-b74e62053687d989/mongolian-beef.jpg", @"1. Slice the flank steak against the grain (the grain is the length of the steak) the long way 1/4 inch think pieces and add it to a ziploc bag with the cornstarch.
                2. Press the steak around in the bag making sure each piece is fully coated with cornstarch and leave it to sit.
                3. Add the canola oil to a large frying pan and heat on medium high heat.
                4. Add the steak, shaking off any excess corn starch, to the pan in a single layer and cook on each side for 1 minute.
                5. If you need to cook the steak in batches because your pan isn't big enough do that rather than crowding the pan, you want to get a good sear on the steak and if you crowd the pan your steak with steam instead of sear.
                6. When the steak is done cooking remove it from the pan.
                7. Add the ginger and garlic to the pan and saute for 10-15 seconds
                8. Add the soy sauce, water, and dark brown sugar to the pan and let it come to a boil
                9. Add the steak back in and let the sauce thicken for 20-30 seconds
                10. The cornstarch we used on the steak should thicken the sauce, if you find it isn't thickening enough, add 1 tablespoon of cornstarch to 1 tablespoon of cold water and stir to dissolve the cornstarch and add it to the pan.
                11. Add the green onions, stir to combine everything, and cook for a final 20-30 seconds
                12. Serve immediately.", "Easy Mongolian Beef", "* Mongolian Beef that's easy to make in just 30 minutes, crispy, sweet and full of garlic and ginger flavors you love from your favorite Chinese restaurant.", 10m, 25, 4, "927249ee-afd9-4bd0-b74e62053687d989" },
                    { -9, 78, -5, 25m, new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), 29, "images/User_927249ee-afd9-4bd0-b74e62053687d989/vegan-fajitas.jpg", @"1. Preheat the oven to 425 degrees Fahrenheit.
                2. Thinly slice the onion. Slice the bell peppers. Chop the cauliflower into small florets. Chop the mushroom into bite-sized pieces. Add the veggies to a big bowl and toss them with the olive oil, chili powder, cumin, paprika, garlic powder, onion powder, and kosher salt.
                3. Line 2 baking sheets with parchment paper. Add the vegetables in a single layer. Roast 15 minutes, then remove the sheets, stir the veggies, and sprinkle on another 1/2 teaspoon salt spread between the trays (1/4 teaspoon on each). Stir again, then return to the oven and roast another 10 minutes until tender.
                4. Meanwhile, pit the avocados. Scoop out the flesh into a bowl and mash with a fork. Add the lime juice, salt, and cilantro.
                5. Heat the refried beans in a small sauce pan.
                6. If desired, char the tortillas by placing them on an open gas flame on medium for a few seconds per side, flipping with tongs, until they are slightly blackened and warm.
                7. To serve, place the refried beans and roasted veggies in tortillas, and top with guac-ish.", "Vegan Fajitas", @"* Guacish is made by pitting 2 avocados, mashing them in a bowl, and adding the juice of 1 lime and chopped cilantro to taste.
                * For best results, warm tortillas in the oven - Heat oven to 350 degrees and wrap tortillas 4 at a time in aluminum foil and cook for 15-20 minutes
                * Homemade refried beans are great if you have time to whip them up, otherwise canned vegetarian refried beans are available at most supermarkets.
                * If using canned refried beans may need some additional cumin or chilli powder to add taste.", 15m, 18, 4, "927249ee-afd9-4bd0-b74e62053687d989" },
                    { -10, 26, -4, 3m, new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 8, 0, 0, 0, 0, DateTimeKind.Local), 15, "images/User_927249ee-afd9-4bd0-b74e62053687d989/vegan-fajitas.jpg", @"1. In a medium bowl, whisk together the 4 eggs. Add the chili powder, garlic powder, cumin, and kosher salt, and whisk until combined
                2. In a skillet, heat the olive oil. Add the eggs and cook over medium low heat, scraping as the eggs solidify, about 3 to 4 minutes total. As you scrape, they’ll start to form together into a meat-like texture. Don’t scrape too much or you’ll make too small of pieces: just enough for that it comes together!
                3. If time, warm and char the tortillas by placing them on an open gas flame on medium for a few seconds per side, flipping with tongs, until they are slightly blackened and warm.
                4. Top with salsa fresca (drain extra liquid before serving), thin sliced red onions, torn cilantro leaves, and hot sauce.", "5 Minute Vegetarian Egg Tacos", @"* Great Toppings Include: Salsa or Pico de Gallo, Red Onion, Cilantro, Lettuce, Sour Cream, Jalapeno, and Crema.
                * Dont scrape the pan too much! You don't want tiny bits of eggs, you'll want it to hold together into a cohesive texture
                * Cook over low medium heat. Don't have the heat too high! This can burn the eggs!
                * This quick recipe makes for a great speedy breakfast for those on the go!", 2m, 16, 2, "927249ee-afd9-4bd0-b74e62053687d989" }
                });

            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Name", "Quantity", "RecipeId", "UOMId" },
                values: new object[,]
                {
                    { -35, "Halibut, Black Cod, or Sea Bass", 1.5m, -6, "lb" },
                    { -68, "Minced Garlic", 1m, -8, "tbsp" },
                    { -69, "Soy Sauce", 0.33m, -8, "cup" },
                    { -70, "Water", 0.33m, -8, "cup" },
                    { -71, "Dark Brown Sugar", 0.5m, -8, "cup" },
                    { -72, "Scallion Stalks, Green Parts Only, 2 Inch Pieces", 4m, -8, "ea" },
                    { -73, "White Onion", 1m, -9, "ea" },
                    { -74, "Bell Peppers", 2m, -9, "ea" },
                    { -75, "Head of Cauliflower", 1m, -9, "ea" },
                    { -76, "Portobello Mushroom", 1m, -9, "ea" },
                    { -77, "Olive Oil", 2m, -9, "tbsp" },
                    { -79, "Cumin", 1m, -9, "tsp" },
                    { -80, "Smoked Paprika", 1m, -9, "tsp" },
                    { -81, "Garlic Powder", 1m, -9, "tsp" },
                    { -67, "Fresh Minced Ginger", 2m, -8, "tsp" },
                    { -82, "Kosher Salt", 1.5m, -9, "tsp" },
                    { -84, "Lime", 1m, -9, "ea" },
                    { -85, "Fresh Cilantro - to taste", 1m, -9, "ea" },
                    { -86, "Tortillas", 8m, -9, "ea" },
                    { -87, "Vegetarian Refried Beans", 15m, -9, "oz" },
                    { -88, "Eggs", 4m, -10, "ea" },
                    { -89, "Chili Powder", 0.5m, -10, "tbsp" },
                    { -90, "Garlic Powder", 0.5m, -10, "tbsp" },
                    { -91, "Cumin", 0.5m, -10, "tbsp" },
                    { -92, "Kosher Salt", 0.25m, -10, "tsp" },
                    { -93, "Olive Oil", 0.5m, -10, "tbsp" },
                    { -94, "Taco-Sized Tortillas", 4m, -10, "ea" },
                    { -95, "Pico de Gallo", 8m, -10, "oz" },
                    { -96, "Red Onion - Sliced", 0.5m, -10, "ea" },
                    { -83, "Ripe Avocado", 2m, -9, "ea" },
                    { -97, "Cilantro Leaves - To Taste", 1m, -10, "ea" },
                    { -66, "Canola Oil", 0.25m, -8, "cup" },
                    { -64, "Flank Steak", 1m, -8, "lb" },
                    { -36, "Salt", 0.5m, -6, "tsp" },
                    { -37, "Coconut Oil or Olive Oil", 3m, -6, "tbsp" },
                    { -38, "Onion - Diced", 1m, -6, "ea" },
                    { -39, "Carrot - Diced", 1m, -6, "cup" },
                    { -40, "Red Bell Pepper - Diced", 1m, -6, "ea" },
                    { -41, "Clove of Garlic - Chopped", 4m, -6, "ea" },
                    { -42, "Jalapeno - Diced", 0.5m, -6, "ea" },
                    { -43, "Tomato Paste", 1m, -6, "tbsp" },
                    { -44, "Paprika", 2m, -6, "tsp" },
                    { -45, "Chicken or Fish Stock", 1m, -6, "cup" },
                    { -46, "Diced Tomatoes", 1.5m, -6, "cup" },
                    { -47, "Coconut Milk", 14m, -6, "oz" },
                    { -48, "Cilantro - Chopped", 0.5m, -6, "cup" },
                    { -65, "Cornstarch", 0.25m, -8, "cup" },
                    { -49, "Lime Juice - To Taste", 1m, -6, "ea" },
                    { -51, "Onion - Diced", 1m, -7, "ea" },
                    { -52, "Small Fennel Bulb - Diced", 1.5m, -7, "cup" },
                    { -53, "Celery - Sliced", 1m, -7, "cup" },
                    { -54, "Garlic Cloves", 4m, -7, "ea" },
                    { -55, "Dry Thyme", 0.5m, -7, "tsp" },
                    { -56, "Smoked Paprika", 0.5m, -7, "tsp" },
                    { -57, "Vermouth (Can leave out, see notes)", 0.33m, -7, "cup" },
                    { -58, "Fish or Chicken Stock (See Notes)", 3m, -7, "cup" },
                    { -59, "Sliced Baby Potatoes", 0.75m, -7, "lb" },
                    { -60, "Salt", 1m, -7, "tsp" },
                    { -61, "Bay Leaf", 1m, -7, "ea" },
                    { -62, "Salmon, Skinless (See Notes)", 1m, -7, "lb" },
                    { -63, "Milk (See Notes)", 2m, -7, "cup" },
                    { -50, "Olive Oil", 3m, -7, "tbsp" },
                    { -98, "Hot Sauce", 4m, -10, "oz" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -98);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -97);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -96);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -95);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -94);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -93);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -92);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -91);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -90);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -89);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -88);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -87);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -86);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -85);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -84);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -83);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -82);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -81);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -80);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -79);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -78);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -77);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -76);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -75);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -74);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -73);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -72);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -71);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -70);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -69);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -68);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -67);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -66);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -65);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -64);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -63);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -62);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -61);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -60);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -59);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -58);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -57);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -56);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -55);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -54);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -53);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -52);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -51);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -50);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -49);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -48);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -47);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -46);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -45);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -44);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -43);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -42);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -41);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -40);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -39);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -38);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -37);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -36);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: -35);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -10);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -9);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -8);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -7);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -6);

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -5,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Name", "Notes" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Preheat grill or broiler.
* 2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.
* 3. Lightly oil the grill or broiler rack (see Tip).
* 4. Season chicken with salt and grill or broil for 2 minutes.
* 5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.
* 6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer.", "Chipotle and Orange grilled Chicken", @"* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.
* Look for the small cans with the Mexican foods in large supermarkets.
* Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.
* Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)
* When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -4,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.
* 2. Place tortillas on a work surface.
* 3. Spread 1/2 cup filling on half of each tortilla.
* 4. Fold tortillas in half, pressing gently to flatten.
* 5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.
* 6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.
* 7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.
* 8. Serve the quesadillas with avocado and the remaining salsa." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -3,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* 1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.
* 2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.
* 3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.
* 4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.
* 5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.
* 6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -2,
                columns: new[] { "DateCreated", "DateModified", "Instructions", "Notes" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Steak on BBQ
* Cook Potatoes to personal preference
* Serve and Enjoy!", @"* Marinate Steak for at least 12 hours for maximum flavor
* Can be cooked on the stovetop but is better when BBQ'd
* Potatoes can be diced, sliced, or baked. Personal preference." });

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: -1,
                columns: new[] { "DateCreated", "DateModified", "Instructions" },
                values: new object[] { new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2020, 12, 6, 0, 0, 0, 0, DateTimeKind.Local), @"* Cook Chicken
* Cook Potatoes
* Smother in Hot Sauce" });
        }
    }
}
