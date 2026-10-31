import json, zipfile, pathlib
root=pathlib.Path(__file__).resolve().parent.parent
projects=json.loads((root/'src/project-downloads.json').read_text(encoding='utf-8-sig'))
assert [p['lesson'] for p in projects]==list(range(1,17))
for p in projects+ [{'file':'screenshot-examples.zip'}]:
    archive=root/'public/downloads'/p['file']
    with zipfile.ZipFile(archive) as z:
        assert z.testzip() is None, archive
        names=z.namelist()
        assert 'ShoeStoreTraining.sln' in names
        assert 'ShoeStoreTraining/ShoeStoreTraining.csproj' in names
        assert any(n.endswith('.Designer.cs') for n in names)
        assert all(not n.startswith('/') and '..' not in n.split('/') and '\\' not in n for n in names)
        assert all('/bin/' not in n and '/obj/' not in n and not n.endswith('.user') for n in names)
        assert b'net8.0-windows' in z.read('ShoeStoreTraining/ShoeStoreTraining.csproj')
        program=z.read('ShoeStoreTraining/Program.cs').decode('utf-8-sig')
        if 'lesson' in p:
            assert archive.stat().st_size==p['bytes']
            assert ('new CatalogForm()' if p['lesson']>=10 else 'new Form1()') in program
            assert ('ShoeStoreTraining/Product.cs' in names)==(p['lesson']>=10)
            assert ('ShoeStoreTraining/ProductDetailsForm.cs' in names)==(p['lesson']>=15)
        else:
            assert 'ExamplesMenu' in program and 'Lesson16Form' in program
print('17 downloadable source archives verified: CRC, complete project files, correct starting forms, no build/user files.')
