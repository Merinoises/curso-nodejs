import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

import authMiddleware from '../middleware/is-auth.js';

//La describe function sirve para agrupar los tests
describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', function () {
        const req = {
            get: function (headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated');
    })

    it('should throw an error if the authorization header is only one string', function () {
        const req = {
            get: function (headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    })

    it('should throw an error if the token cannot be verified', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => { })).to.throw();
    })

    it('should yield a userId after decoding the token', function () {
        const req = {
            get: function (headerName) {
                return 'Bearer xyz';
            }
        };
        //Modificación de la función que puede dar problemas: 
        // jwt.verify = function() {
        //     return { userId: 'abc' }
        // }
        //Mejor usar la función stub de sinon
        //El paquete sinon me permite volver a restaurar jwt.verify tras el test
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({userId: 'abc'});
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        //Restauramos la original con sinon
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    })
})

