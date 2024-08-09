import { Injectable, Logger } from '@nestjs/common';
import { AssetServerPlugin, AssetServerOptions } from '@vendure/asset-server-plugin';
import { Asset } from '@vendure/core';
import sharp from 'sharp';

@Injectable()
export class CustomAssetServerPlugin extends AssetServerPlugin {
  private readonly logger = new Logger(CustomAssetServerPlugin.name);

  static init(options: AssetServerOptions) {
    return super.init(options);
  }

  override async processAsset(asset: Asset, fileBuffer: Buffer): Promise<Asset> {
    try {
      // Set default focal point
      asset.focalPoint = { x: 0.5, y: 0.5 };

      // Use Sharp to process the image (optional)
      const image = sharp(fileBuffer);
      const metadata = await image.metadata();

      // Add any custom image processing here, e.g., resizing, cropping, etc.

      // Convert the image back to a buffer
      const processedBuffer = await image.toBuffer();

      return super.processAsset(asset, processedBuffer);
    } catch (error) {
      this.logger.error('Error processing asset:', error);
      throw error;
    }
  }
}