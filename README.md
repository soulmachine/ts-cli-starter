# Tools for using nft.storage

```bash
npm install -g nft-cli
```

## Pack directory into `.car` file

Content Addressable aRchive ([`.car`](https://github.com/ipld/js-car)) is an archive file that stores files in the same manner as IPFS. This makes uploading it to an IPFS compatible endpoint easy.

```bash
nft pack <file or directory> --output <path/to/file.car> # default is ./index.car
```

Note: this will not include the directory in the file, e.g. if you had the following `dir/a`

```bash
nft pack dir
```

generates `index.car` which includes `a` but not `dir`.

## Upload

Requires the environment variable `NFT_STORAGE_API_TOKEN` or `--api-key ...` from [`nft.storage`](https://nft.storage)

```bash
nft upload <path/to/file.car>
```
