
import java.awt.Color;
import java.awt.Graphics;

public class World{

	private int width, height; //IN units of tiles
	private int[][] tiles; // makes a multidimensional array

	public World(String path){
		loadWorld(path);

	}

	private void loadWorld(String path){
		width = 5;
		height = 5;
		tiles = new int[width][height];

		// for now it is all set to index 0

		for (int x = 0; x< width; x++){
			for(int y = 0; y< height; y++){
				tiles[x][y]=0;
			}
		}
	}


	public void tick(){

	}

	public void render(Graphics g){
		for(int y = 0; y< height;y++){
			for(int x = 0; x< width; x++){
				getTile(x,y).render(g,100,300);//*Tile.TILEWIDTH,y*Tile.TILEHEIGHT);

			}
		}
	}

	public Tile getTile(int x, int y){
		Tile t = Tile.tiles[tiles[x][y]];
		if(t == null){
			return Tile.tiles[tiles[0][0]];
		}
	}



}
